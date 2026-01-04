## **1. Enumerations Equal**

**Node Functions**

After confirming the Enumeration type, determines whether the two input values are equal

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|------------------------------------------|
| Input Parameter | Enumeration 1 | Generic |  |
| Input Parameter | Enumeration 2 | Generic |  |
| Output Parameter | Result | Boolean | Output True if equal, False if not equal |

## **2. Assembly List**

**Node Functions**

Assembles multiple Input Parameters of the same type (up to 100) into a single List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------------|--------------------------------------------|
| Input Parameter | 0~99 | Generic | Assembles up to 100 parameters into a list |
| Output Parameter | List | Generic List | The assembled list |

## **3. Equal**

**Node Functions**

Determines whether two inputs are equal

Some Parameter Types have special comparison rules:

Floating Point Numbers: Floating Point Numbers are compared using approximate equality. When the difference between two Floating Point Numbers is less than an extremely small value, the two numbers are considered equal. For example: 2.0000001 and 2.0 are considered equal

3D Vector: The x, y, and z components of a 3D Vector are compared using Floating Point approximate equality

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|------------------------------------------|
| Input Parameter | Enumeration 1 | Generic |  |
| Input Parameter | Enumeration 2 | Generic |  |
| Output Parameter | Result | Boolean | Output True if equal, False if not equal |

## **4. Data Type Conversion**

**Node Functions**

Converts input parameter types to another type for output. For specific rules, see [Basic Concepts](https://act.mihoyo.com/ys/ugc/tutorial//detail/mhk23ora1wom) - [Conversion Rules Between Basic Data Types]

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input | Generic |  |
| Output Parameter | Output | Generic |  |

## II. Math

## **1. Split 3D Vector**

**Node Functions**

Outputs the x, y, and z components of a 3D Vector as three Floating Point Numbers

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | 3D Vector | 3D Vector |  |
| Output Parameter | X-Component | Floating Point Numbers |  |
| Output Parameter | Y-Component | Floating Point Numbers |  |
| Output Parameter | Z-Component | Floating Point Numbers |  |

## **2. Multiplication**

**Node Functions**

Performs multiplication, supporting Floating Point and Integer multiplication

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Generic |  |

## **3. Division**

**Node Functions**

Performs division, supporting Floating Point division and Integer division. Integer division returns the quotient result

The divisor should not be 0, otherwise it may return an illegal value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Generic |  |

## **4. Create 3D Vector**

**Node Functions**

Creates a 3D Vector from x, y, and z components

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | X-Component | Floating Point Numbers |  |
| Input Parameter | Y-Component | Floating Point Numbers |  |
| Input Parameter | Z-Component | Floating Point Numbers |  |
| Output Parameter | 3D Vector | 3D Vector |  |

## **5. Logarithm Operation**

**Node Functions**

Calculates the logarithm of the argument with the specified base

The base should not be negative or equal to 1, and the argument should not be negative, otherwise illegal values may be generated

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Real Number | Floating Point Numbers |  |
| Input Parameter | Base | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **6. Arccosine Function**

**Node Functions**

Calculates the arccosine of the input and returns the value in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Input | Floating Point Numbers |  |
| Output Parameter | Radian | Floating Point Numbers |  |

## **7. Arctangent Function**

**Node Functions**

Calculates the arctangent of the input and returns the value in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Input | Floating Point Numbers |  |
| Output Parameter | Radian | Floating Point Numbers |  |

## **8. Arcsine Function**

**Node Functions**

Calculates the arcsine of the input and returns the value in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Input | Floating Point Numbers |  |
| Output Parameter | Radian | Floating Point Numbers |  |

## **9. Range Limiting Operation**

**Node Functions**

Clamps the input value to the range [lower limit, upper limit] (both bounds inclusive) and outputs the result


If the input falls within [lower limit, upper limit], returns the original value


If the input is below the lower limit, returns the lower limit; if it exceeds the upper limit, returns the upper limit


If the lower limit is greater than the upper limit, treats the input as invalid and returns an illegal value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input | Generic |  |
| Input Parameter | Lower Limit | Generic |  |
| Input Parameter | Upper Limit | Generic |  |
| Output Parameter | Result | Generic |  |

## **10. Direction Vector to Rotation**

**Node Functions**

Converts the Forward Vector and Upward Vector to Euler Angles

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Forward Vector | 3D Vector | Represents the desired Orientation of the Unit |
| Input Parameter | Upward Vector | 3D Vector | Defines the Unit's Up direction (used to determine the rotation angle). Default is the positive Y-axis of the World Coordinate System |
| Output Parameter | Rotate | 3D Vector |  |

## **11. Calculate Timestamp From Formatted Time**

**Node Functions**

Converts a formatted time to a timestamp

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Year | Integer |  |
| Input Parameter | Month | Integer |  |
| Input Parameter | Day | Integer |  |
| Input Parameter | Hour | Integer |  |
| Input Parameter | Minute | Integer |  |
| Input Parameter | Second | Integer |  |
| Output Parameter | Timestamp | Integer |  |

## **12. Calculate Formatted Time From Timestamp**

**Node Functions**

Converts a timestamp to formatted time

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Timestamp | Integer |  |
| Output Parameter | Year | Integer |  |
| Output Parameter | Month | Integer |  |
| Output Parameter | Day | Integer |  |
| Output Parameter | Hour | Integer |  |
| Output Parameter | Minute | Integer |  |
| Output Parameter | Second | Integer |  |

## **13. Calculate Day of the Week From Timestamp**

**Node Functions**

Converts a timestamp to the day of the week

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Timestamp | Integer |  |
| Output Parameter | Weekday | Integer |  |

## **14. Radians to Degrees**

**Node Functions**

Converts radians to degrees

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Radian Value | Floating Point Numbers |  |
| Output Parameter | Angle Value | Floating Point Numbers |  |

## **15. Addition**

**Node Functions**

Adds two Floating Point Numbers or Integers

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Generic |  |

## **16. Subtraction**

**Node Functions**

Subtracts two Floating Point Numbers or Integers

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Generic |  |

## **17. Degrees to Radians**

**Node Functions**

Converts degrees to radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Angle Value | Floating Point Numbers |  |
| Output Parameter | Radian Value | Floating Point Numbers |  |

## **18. Take Larger Value**

**Node Functions**

Returns the larger of two inputs

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input 1 | Generic |  |
| Input Parameter | Input 2 | Generic |  |
| Output Parameter | Larger Value | Generic |  |

## **19. Take Smaller Value**

**Node Functions**

Returns the smaller of two inputs

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input 1 | Generic |  |
| Input Parameter | Input 2 | Generic |  |
| Output Parameter | Smaller Value | Generic |  |

## **20. Absolute Value Operation**

**Node Functions**

Returns the absolute value of the input

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input | Generic |  |
| Output Parameter | Result | Generic |  |

## **21. Distance Between Two Coordinate Points**

**Node Functions**

Calculates the Euclidean distance between two coordinates

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|------------------------|-------------|
| Input Parameter | Coordinate Point 1 | 3D Vector |  |
| Input Parameter | Coordinate Point 2 | 3D Vector |  |
| Output Parameter | Distance | Floating Point Numbers |  |

## **22. Logical NOT Operation**

**Node Functions**

Performs a logical NOT operation on the input Boolean value and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input | Boolean |  |
| Output Parameter | Result | Boolean |  |

## **23. Logical OR Operation**

**Node Functions**

Performs a logical OR operation on the two input Boolean values and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input 1 | Boolean |  |
| Input Parameter | Input 2 | Boolean |  |
| Output Parameter | Result | Boolean |  |

## **24. Logical XOR Operation**

**Node Functions**

Performs a logical XOR operation on the two input Boolean values and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input 1 | Boolean |  |
| Input Parameter | Input 2 | Boolean |  |
| Output Parameter | Result | Boolean |  |

## **25. Logical AND Operation**

**Node Functions**

Performs a logical AND operation on the two input Boolean values and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input 1 | Boolean |  |
| Input Parameter | Input 2 | Boolean |  |
| Output Parameter | Result | Boolean |  |

## **26. Exponentiation**

**Node Functions**

Raises the base to the given exponent and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Base | Generic |  |
| Input Parameter | Exponent | Generic |  |
| Output Parameter | Result | Generic |  |

## **27. Modulo Operation**

**Node Functions**

Returns the modulus of Input 2 and Input 1

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Integer |  |
| Input Parameter |  | Integer |  |
| Output Parameter | Result | Integer |  |

## **28. Arithmetic Square Root Operation**

**Node Functions**

Returns the arithmetic square root of the input value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Input | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **29. Sign Operation**

**Node Functions**

When the input is positive, returns 1

When the input is negative, returns -1

When the input is 0, returns 0

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input | Generic |  |
| Output Parameter | Result | Generic |  |

## **30. Round to Integer Operation**

**Node Functions**

Performs a rounding operation based on the rounding method and returns the rounded positive number

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Input | Floating Point Numbers |  |
| Input Parameter | Rounding Mode | Enumeration | Round: Rounds to the nearest integer according to standard rules

Round Up: Returns the smallest integer greater than the input value. For example: input 1.2 → 2; input −2.3 → −2

Round Down: Returns the largest integer smaller than the input value. For example: input 1.2 → 1; input −2.3 → −3

Truncate: Removes the decimal part of the floating point number (rounds toward zero). For example: input 1.2 → 1; input −2.3 → −2 |
| Output Parameter | Result | Integer |  |

## **31. 3D Vector Normalization**

**Node Functions**

Normalizes the length of a 3D Vector and outputs the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | 3D Vector | 3D Vector |  |
| Output Parameter | Result | 3D Vector |  |

## **32. 3D Vector Addition**

**Node Functions**

Calculates the sum of two 3D Vectors

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Result | 3D Vector |  |

## **33. 3D Vector Angle**

**Node Functions**

Calculates the angle between two 3D Vectors and outputs it in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|------------------------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Angle (Radians) | Floating Point Numbers |  |

## **34. 3D Vector Subtraction**

**Node Functions**

Calculates the difference of two 3D Vectors

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Result | 3D Vector |  |

## **35. 3D Vector Modulo Operation**

**Node Functions**

Calculates the magnitude of the input 3D Vector

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | 3D Vector | 3D Vector |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **36. 3D Vector Dot Product**

**Node Functions**

Calculates the dot product of two input 3D Vectors

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **37. 3D Vector Zoom**

**Node Functions**

Scales the input 3D Vector (scalar multiplication) and outputs the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|------------------------|-------------|
| Input Parameter | 3D Vector | 3D Vector |  |
| Input Parameter | Zoom Multiplier | Floating Point Numbers |  |
| Output Parameter | Result | 3D Vector |  |

## **38. 3D Vector Cross Product**

**Node Functions**

Calculates the cross product of two 3D Vectors

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Result | 3D Vector |  |

## **39. 3D Vector Rotation**

**Node Functions**

Rotates the input 3D Vector by the Euler Angles specified by the rotation and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-----------|---------------------------------------------------------------------|
| Input Parameter | Rotate | 3D Vector | This 3D input vector represents a specific rotation in Euler angles |
| Input Parameter | Rotated 3D Vector | 3D Vector |  |
| Output Parameter | Result | 3D Vector |  |

## **40. Greater Than**

**Node Functions**

Returns whether the left value is greater than the right value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Left Value | Generic |  |
| Input Parameter | Right Value | Generic |  |
| Output Parameter | Result | Boolean |  |

## **41. Greater Than or Equal To**

**Node Functions**

Returns whether the left value is greater than or equal to the right value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Left Value | Generic |  |
| Input Parameter | Right Value | Generic |  |
| Output Parameter | Result | Boolean |  |

## **42. Less Than**

**Node Functions**

Returns whether the left value is less than the right value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Left Value | Generic |  |
| Input Parameter | Right Value | Generic |  |
| Output Parameter | Result | Boolean |  |

## **43. Less Than or Equal To**

**Node Functions**

Returns whether the left value is less than or equal to the right value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Left Value | Generic |  |
| Input Parameter | Right Value | Generic |  |
| Output Parameter | Result | Boolean |  |

## **44. Cosine Function**

**Node Functions**

Calculates the cosine of the input in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Radian | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **45. Tangent Function**

**Node Functions**

Calculates the tangent of the input in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Radian | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **46. Sine Function**

**Node Functions**

Calculates the sine of the input in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Radian | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **47. Left Shift Operation**

**Node Functions**

Performs a logical left shift on the input by the specified bit count and outputs the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------|---------|-------------|
| Input Parameter | Value | Integer |  |
| Input Parameter | Left Shift Count | Integer |  |
| Output Parameter | Result | Integer |  |

## **48. Right Shift Operation**

**Node Functions**

Performs a logical right shift on the input by the specified bit count and outputs the result

Performs an arithmetic right shift, preserving the sign bit

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|---------|-------------|
| Input Parameter | Value | Integer |  |
| Input Parameter | Right Shift Count | Integer |  |
| Output Parameter | Result | Integer |  |

## **49. Bitwise AND**

**Node Functions**

Performs a bitwise AND operation on the two inputs and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Value 1 | Integer |  |
| Input Parameter | Value 2 | Integer |  |
| Output Parameter | Result | Integer |  |

## **50. Bitwise OR**

**Node Functions**

Performs a bitwise OR operation on the two inputs and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Value 1 | Integer |  |
| Input Parameter | Value 2 | Integer |  |
| Output Parameter | Result | Integer |  |

## **51. XOR (Exclusive OR)**

**Node Functions**

Performs a bitwise XOR operation on the two inputs and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Value 1 | Integer |  |
| Input Parameter | Value 2 | Integer |  |
| Output Parameter | Result | Integer |  |

## **52. Bitwise Complement**

**Node Functions**

Performs a bitwise complement operation on the input and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Value | Integer |  |
| Output Parameter | Result | Integer |  |

## **53. Write by bit**

**Node Functions**

Writes the write value as a binary number to the [start bit, end bit] of the target value (also a binary number). The start bit is indexed from 0, and the write length includes both the start and end bits

If the binary significant length of the write value (counted from the first 1 from the left) exceeds the write length, the write fails and returns the original value

If the write value is negative, it also fails due to exceeding the write length (the first bit of a negative number's binary representation is the sign bit 1)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------------|---------|-------------|
| Input Parameter | Written value | Integer |  |
| Input Parameter | Write value | Integer |  |
| Input Parameter | Write starting position | Integer |  |
| Input Parameter | Write end position | Integer |  |
| Output Parameter | Result | Integer |  |

## **54. Read by bit**

**Node Functions**

Reads the value from [start bit, end bit] of the value (in binary representation)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|---------|-------------|
| Input Parameter | Value | Integer |  |
| Input Parameter | Read starting position | Integer |  |
| Input Parameter | Read end position | Integer |  |
| Output Parameter | Result | Integer |  |

## III. Dictionary

## **1. Create Dictionary**

**Node Functions**

Creates Key-Value Pairs sequentially from the input key and value lists

This node builds the Dictionary using the shorter of the key and value lists; extra items are truncated

If duplicate keys are found in the key list, creation fails and returns an empty Dictionary

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Key List | Generic |  |
| Input Parameter | Value List | Generic |  |
| Output Parameter | Dictionary | Generic |  |

## **2. Assembly Dictionary**

**Node Functions**

Combines up to 50 Key-Value Pairs into one Dictionary

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------------------|-------------|
| Input Parameter | Key 0~49 | Generic |  |
| Input Parameter | Value 0~49 | Generic |  |
| Output Parameter | Dictionary | Generic Dictionary |  |

## IV. Structures

## **1. Split Structure**

**Node Functions**

Returns all parameters of the specified Structure

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |

## **2. Assemble Structure**

**Node Functions**

Combines multiple parameters into a single Structure-type value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |