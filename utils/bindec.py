# 解码 GIA 文件到原始的 protobuf message 结构
# Version 1.0.0

import struct
import argparse
import subprocess
import sys


class ProtobufParser:
  def __init__(self, strict=True):
    self.strict = strict

  # ----- 基础读取 -----

  def read_varint(self, data, pos):
    value = 0
    shift = 0
    start_pos = pos

    while True:
      if pos >= len(data):
        raise ValueError(f"Unexpected EOF while reading varint at {start_pos}")

      b = data[pos]
      pos += 1

      value |= (b & 0x7F) << shift
      if not (b & 0x80):  # MSB = 0 → finished
        break

      shift += 7
      if shift > 70:  # 防止异常无限循环
        raise ValueError("Varint too long, likely corrupted")

    return value, pos

  def read_fixed32(self, data, pos):
    if pos + 4 > len(data):
      raise ValueError("Unexpected EOF in fixed32")
    value = struct.unpack("<I", data[pos : pos + 4])[0]
    return value, pos + 4

  def read_fixed64(self, data, pos):
    if pos + 8 > len(data):
      raise ValueError("Unexpected EOF in fixed64")
    value = struct.unpack("<Q", data[pos : pos + 8])[0]
    return value, pos + 8

  # ----- 主解析函数 -----

  def parse_message(self, data, pos=0, length=None):
    if length is None:
      length = len(data)

    end = pos + length
    result = {}
    result_tags = {}

    def append(field, value, tag):
      result.setdefault(field, []).append(value)
      result_tags.setdefault(field, []).append(tag)

    while pos < end:
      # 读取 tag (field_number << 3 | wire_type)
      tag, pos = self.read_varint(data, pos)
      field_number = tag >> 3
      wire_type = tag & 0b111

      if field_number == 0:
        raise ValueError(f"Invalid field_number=0 at pos={pos}")

      # 解析字段
      if wire_type == 0:  # Varint
        value, pos = self.read_varint(data, pos)
        tag_desc = "wire_type=0 (Varint: int32/int64/bool/enum)"

      elif wire_type == 1:  # 64-bit
        value, pos = self.read_fixed64(data, pos)
        tag_desc = "wire_type=1 (fixed64/double)"

      elif wire_type == 2:  # Length-delimited
        size, pos = self.read_varint(data, pos)
        if pos + size > end:
          raise ValueError("Length-delimited field exceeds message boundary")

        raw = data[pos : pos + size]

        # 递归解析内部 message（如果能成功）
        try:
          sub_msg, sub_tag = self.parse_message(raw, 0, len(raw))
          value = sub_msg
          tag_desc = sub_tag
        except Exception:
          # 如果不是一个 message，则当做 string or bytes 返回
          try:
            value = raw.decode("utf8")
            tag_desc = "wire_type=2 (string)"
          except Exception:
            value = raw
            tag_desc = "wire_type=2 (bytes)"

        pos += size

      elif wire_type == 5:  # 32-bit
        value, pos = self.read_fixed32(data, pos)
        tag_desc = "wire_type=5 (fixed32/float32)"

      else:
        if self.strict:
          raise ValueError(f"Unsupported wire type {wire_type}")
        else:
          # 非严格模式：跳过
          break

      # 保存到 result（可能是 repeated）
      append(field_number, value, tag_desc)

    return result, result_tags


def read_arg():
  parser = argparse.ArgumentParser(description="Parse protobuf file")
  parser.add_argument("FILE_PATH", help="Path to the protobuf file")
  parser.add_argument(
    "--tags", action="store_true", help="Whether to include tags in the output"
  )  
  parser.add_argument(
    "--with_header", action="store_false", help="Whether to skip file header"
  )
  args = parser.parse_args()
  return args


if __name__ == "__main__":
  parser = ProtobufParser(strict=True)

  args = read_arg()
  with open(args.FILE_PATH, "rb") as f:
    data = f.read()  # 去掉文件头和尾
  if args.with_header:
    data = data[20:-4] 
  
    # print("Parsing file:", args)

  parsed, tags = parser.parse_message(data)

  output_path1 = args.FILE_PATH + ".js"
  with open(output_path1, "w", encoding="utf-8") as f:
    f.write(f"export const ROOT = {parsed};")
  if args.tags:
    output_path2 = args.FILE_PATH + ".tag.js"
    with open(output_path2, "w", encoding="utf-8") as f:
      f.write(f"export const TAG = {tags};")

  # Format the output file with deno
  try:
    subprocess.run(["deno", "fmt", output_path1], check=True)
    print(f"Successfully formatted {output_path1}")
    if args.tags:
      subprocess.run(["deno", "fmt", output_path2], check=True)
      print(f"Successfully formatted {output_path2}")
  except subprocess.CalledProcessError:
    print(f"Error: deno fmt failed for {output_path1}", file=sys.stderr)
    sys.exit(1)
  except FileNotFoundError:
    print(
      "Error: deno not found. Please install deno to format the output.",
      file=sys.stderr,
    )
    sys.exit(1)
