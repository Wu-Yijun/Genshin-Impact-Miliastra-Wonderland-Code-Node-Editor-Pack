## I. General

## **1. Enumeration Match**

**Node Functions**

After confirming the Enumeration type, determines whether the two input values are equal

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|------------------------------------------|
| Input Parameter | Enumeration 1 | Generic |  |
| Input Parameter | Enumeration 2 | Generic |  |
| Output Parameter | Result | Boolean | Output True if equal, False if not equal |

## **2. Equal**

**Node Functions**

Determines whether two inputs are equal

Some Parameter Types have special comparison rules:

Floating Point Numbers: Floating Point Numbers are compared using approximate equality. When the difference between two Floating Point Numbers is less than an extremely small value, the two numbers are considered equal. For example: 2.0000001 and 2.0 are considered equal

3D Vector: The x, y, and z components of a 3D Vector are compared using Floating Point approximate equality

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Boolean |  |

## **3. Data Type Conversion**

**Node Functions**

Converts input parameter types to another type for output. For specific rules, see [Basic Concepts](https://act.mihoyo.com/ys/ugc/tutorial//detail/mhk23ora1wom) - [Conversion Rules Between Basic Data Types]

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|---------|-------------|
| Input Parameter | Input | Generic |  |
| Output Parameter | Conversion Result | Generic |  |

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

## **2. Orientation to Rotation**

**Node Functions**

Converts a Direction Vector to Euler Angles

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | Orientation | 3D Vector |  |
| Output Parameter | Rotate | 3D Vector |  |

## **3. Multiplication**

**Node Functions**

Performs multiplication, supporting Floating Point and Integer multiplication

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Generic |  |

## **4. Division**

**Node Functions**

Performs division, supporting Floating Point division and Integer division. Integer division returns the quotient result

The divisor should not be 0, otherwise it may return an illegal value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Generic |  |

## **5. Arccosine Function**

**Node Functions**

Calculates the arccosine of the input and returns the value in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Input | Floating Point Numbers |  |
| Output Parameter | Radian | Floating Point Numbers |  |

## **6. Arctangent Function**

**Node Functions**

Calculates the arctangent of the input and returns the value in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Input | Floating Point Numbers |  |
| Output Parameter | Radian | Floating Point Numbers |  |

## **7. Arcsine Function**

**Node Functions**

Calculates the arcsine of the input and returns the value in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Input | Floating Point Numbers |  |
| Output Parameter | Radian | Floating Point Numbers |  |

## **8. Direction Vector to Rotation**

**Node Functions**

Converts the Forward Vector and Upward Vector to Euler Angles

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Forward Vector | 3D Vector | Represents the desired Orientation of the Unit |
| Input Parameter | Upward Vector | 3D Vector | Defines the Unit's Up direction (used to determine the rotation angle). Default is the positive Y-axis of the World Coordinate System |
| Output Parameter | Rotate | 3D Vector |  |

## **9. Radians to Degrees**

**Node Functions**

Converts radians to degrees

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Radian | Floating Point Numbers |  |
| Output Parameter | Angle | Floating Point Numbers |  |

## **10. Get Random Number**

**Node Functions**

Returns a random number in [Lower Limit, Upper Limit] (inclusive)

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Lower Limit | Generic |  |
| Input Parameter | Upper Limit | Generic |  |
| Output Parameter | Random Number | Generic |  |

## **11. Addition**

**Node Functions**

Adds two Floating Point Numbers or Integers

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Generic |  |

## **12. Subtraction**

**Node Functions**

Subtracts two Floating Point Numbers or Integers

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Generic |  |

## **13. Degrees to Radians**

**Node Functions**

Converts degrees to radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Angle | Floating Point Numbers |  |
| Output Parameter | Radian | Floating Point Numbers |  |

## **14. Absolute Value Operation**

**Node Functions**

Returns the absolute value of the input

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Input | Generic |  |
| Output Parameter | Result | Generic |  |

## **15. Logical NOT Operation**

**Node Functions**

Performs a logical NOT operation on the input Boolean value and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Condition | Boolean |  |
| Output Parameter | Result | Boolean |  |

## **16. Logical OR Operation**

**Node Functions**

Performs a logical OR operation on the two input Boolean values and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Condition 1 | Boolean |  |
| Input Parameter | Condition 2 | Boolean |  |
| Output Parameter | Result | Boolean |  |

## **17. Logical XOR Operation**

**Node Functions**

Performs a logical XOR operation on the two input Boolean values and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Condition 1 | Boolean |  |
| Input Parameter | Condition 2 | Boolean |  |
| Output Parameter | Result | Boolean |  |

## **18. Logical AND Operation**

**Node Functions**

Performs a logical AND operation on the two input Boolean values and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter | Condition 1 | Boolean |  |
| Input Parameter | Condition 2 | Boolean |  |
| Output Parameter | Result | Boolean |  |

## **19. 3D Vector Normalization**

**Node Functions**

Normalizes the length of a 3D Vector and outputs the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-----------|-------------|
| Input Parameter | 3D Vector | 3D Vector |  |
| Output Parameter | Result | 3D Vector |  |

## **20. 3D Vector Addition**

**Node Functions**

Calculates the sum of two 3D Vectors

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-----------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Calculation Result | 3D Vector |  |

## **21. 3D Vector Angle**

**Node Functions**

Calculates the angle between two 3D Vectors and outputs the value in degrees

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Angle | Floating Point Numbers |  |

## **22. 3D Vector Subtraction**

**Node Functions**

Calculates the difference of two 3D Vectors

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-----------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Calculation Result | 3D Vector |  |

## **23. 3D Vector Modulo Operation**

**Node Functions**

Calculates the magnitude of the input 3D Vector

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | 3D Vector | 3D Vector |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **24. 3D Vector Dot Product**

**Node Functions**

Calculates the dot product of two input 3D Vectors

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|------------------------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Calculation Result | Floating Point Numbers |  |

## **25. 3D Vector Zoom**

**Node Functions**

Scales the input 3D Vector (scalar multiplication) and outputs the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-----------------|------------------------|-------------|
| Input Parameter | Zoom Multiplier | Floating Point Numbers |  |
| Input Parameter | 3D Vector | 3D Vector |  |
| Output Parameter | Result | 3D Vector |  |

## **26. 3D Vector Cross Product**

**Node Functions**

Calculates the cross product of two 3D Vectors

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|--------------------|-----------|-------------|
| Input Parameter | 3D Vector 1 | 3D Vector |  |
| Input Parameter | 3D Vector 2 | 3D Vector |  |
| Output Parameter | Calculation Result | 3D Vector |  |

## **27. 3D Vector Rotation**

**Node Functions**

Rotates the input 3D Vector by the Euler Angles specified by the rotation and returns the result

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|-----------|-------------|
| Input Parameter | Rotated 3D Vector | 3D Vector |  |
| Input Parameter | Rotate | 3D Vector |  |
| Output Parameter | Result | 3D Vector |  |

## **28. Greater Than**

**Node Functions**

Returns whether the left value is greater than the right value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Boolean |  |

## **29. Greater Than or Equal To**

**Node Functions**

Returns whether the left value is greater than or equal to the right value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Boolean |  |

## **30. Less Than**

**Node Functions**

Returns whether the left value is less than the right value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Boolean |  |

## **31. Less Than or Equal To**

**Node Functions**

Returns whether the left value is less than or equal to the right value

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|---------|-------------|
| Input Parameter |  | Generic |  |
| Input Parameter |  | Generic |  |
| Output Parameter | Result | Boolean |  |

## **32. Cosine Function**

**Node Functions**

Calculates the cosine of the input in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Radian | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **33. Tangent Function**

**Node Functions**

Calculates the tangent of the input in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Radian | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **34. Sine Function**

**Node Functions**

Calculates the sine of the input in radians

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | Radian | Floating Point Numbers |  |
| Output Parameter | Result | Floating Point Numbers |  |

## **35. Create 3D Vector**

**Node Functions**

Creates a 3D Vector from x, y, and z components

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|------------------------|-------------|
| Input Parameter | X-Component | Floating Point Numbers |  |
| Input Parameter | Y-Component | Floating Point Numbers |  |
| Input Parameter | Z-Component | Floating Point Numbers |  |
| Output Parameter | 3D Vector | 3D Vector |  |

## III. Lists

## **1. Assembly List**

**Node Functions**

Assembles multiple Input Parameters of the same type (up to 100) into a single List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|--------------|--------------------------------------------|
| Input Parameter | 0~99 | Generic | Assembles up to 100 parameters into a list |
| Output Parameter | List | Generic List | The assembled list |