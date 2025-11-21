# 解码 GIA 文件到可读文本格式

import argparse
import subprocess
import sys
import os

PYTHON_FILE_PATH = sys.argv[0]
PYTHON_DIR_PATH = os.path.dirname(os.path.abspath(PYTHON_FILE_PATH))
PYTHON_REL_PATH = os.path.relpath(PYTHON_DIR_PATH, os.getcwd())

def read_arg():
  parser = argparse.ArgumentParser(description="Parse protobuf file")

  group = parser.add_mutually_exclusive_group(required=True)
  group.add_argument("FILE_PATH", nargs="?", help="Path to the protobuf file")
  group.add_argument("--files", nargs="+", help="A list of file paths")

  parser.add_argument("--no-print", action="store_true", help="Suppress output")
  parser.add_argument("-o", help="Output file path")
  args = parser.parse_args()

  # print(args)
  return args


def main(path, no_print=False, output=None):
  with open(path, "rb") as f:
    data = f.read()[20:-4]  # 去掉文件头和尾

  p = subprocess.Popen(
    # [f"{PYTHON_DIR_PATH}/protoc.exe", "--decode=Root", "./utils/gia.proto"],
    [f"{PYTHON_REL_PATH}/protoc.exe", "--decode=Root", f"{PYTHON_REL_PATH}/gia.proto"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
  )
  stdout, stderr = p.communicate(data)
  if p.returncode != 0:
    print("protoc error:", stderr.decode())
  else:
    text = stdout.decode()
    if not no_print:
      print("decoded message:")
      print(text)
    if output:
      with open(output, "w") as f:
        f.write(text.replace('\r\n', '\n'))

    # search_term = "manual_input"
    # if search_term in text:
    #   print(f'\nThe term "{search_term}" was found in the decoded message.')


if __name__ == "__main__":
  args = read_arg()

  if args.FILE_PATH:
    main(args.FILE_PATH, no_print=args.no_print, output=args.o)
  if args.files:
    for file_path in args.files:
      main(file_path, no_print=args.no_print, output=args.o)
