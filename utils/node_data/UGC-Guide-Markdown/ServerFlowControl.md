## **1. Multiple Branches**

**Node Functions**

Accepts one input parameter as the control expression (supports Integer or String). Branches into multiple paths based on its value

When the value on an Output Pin equals the control expression, execution continues along that Output Pin. If no pin matches, the [Default] pin is taken

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|---------|-----------------------------------|
| Input Parameter | Control Expression | Generic | Only supports Integers or Strings |

## **2. Double Branch**

**Node Functions**

Branches into True or False based on the evaluated condition

When the Boolean is True, the [True] execution flow runs; when it is False, the [False] execution flow runs

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Condition | Boolean |  |