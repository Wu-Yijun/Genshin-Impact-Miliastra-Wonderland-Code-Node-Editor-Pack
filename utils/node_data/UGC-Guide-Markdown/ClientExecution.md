## I. Character Skills

## **1. Traverse Entity List**

**Node Functions**

Iterates through each Entity in the input Entity List

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|----------------|-------------|-------------|
| Input Parameter | Entity List | Entity List |  |
| Output Parameter | Current Entity | Entity |  |

## **2. Play Timed Effects**

**Node Functions**

Plays Timed Effects at the specified World Location

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------------------------|------------------------|-------------|
| Input Parameter | Special Effects Asset Configuration ID | Config ID |  |
| Input Parameter | Location | 3D Vector |  |
| Input Parameter | Rotate | 3D Vector |  |
| Input Parameter | Zoom Multiplier | Floating Point Numbers |  |
| Input Parameter | Play Default Sound Effects? | Boolean |  |

## **3. Fixed-Point Projectile Launch**

**Node Functions**

Spawns a Local Projectile at the specified Location in the World Coordinate System

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|-----------|-------------|
| Input Parameter | Projectile's Prefab ID | Prefab ID |  |
| Input Parameter | Create Location | 3D Vector |  |
| Input Parameter | Create Rotation | 3D Vector |  |
| Input Parameter | Track Target | Entity |  |
| Input Parameter | Projectile Faction | Faction |  |

## **4. Fixed-Point Displacement**

**Node Functions**

Moves from the current Location to the Target Location

Supports configuring movement duration and speed; if both are small, the movement may not reach the Target Location

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------------------|------------------------|-------------|
| Input Parameter | Displacement Duration | Floating Point Numbers |  |
| Input Parameter | Displacement Attenuation Duration | Floating Point Numbers |  |
| Input Parameter | Displacement Speed | Floating Point Numbers |  |
| Input Parameter | Displacement Target Location | 3D Vector |  |
| Input Parameter | Terminate Displacement on Collision | Boolean |  |

## **5. Recover HP**

**Node Functions**

Initiates a one-time HP restoration for the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------------------|------------------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Recovery Amount | Floating Point Numbers |  |
| Input Parameter | Ignore Recovery Adjustment Effect | Boolean |  |
| Input Parameter | Aggro Multiplier for This Healing | Floating Point Numbers |  |
| Input Parameter | Aggro Increment for This Healing | Integer |  |

## **6. Camera Orientation Detection Data**

**Node Functions**

Casts a ray from the Camera to the emission Location and returns the Rotation and Location of valid Targets along the path

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|-------------------|------------------------|-------------|
| Input Parameter | Target Type | Enumeration |  |
| Input Parameter | Launch Location | 3D Vector |  |
| Input Parameter | Nearest Distance | Floating Point Numbers |  |
| Input Parameter | Furthest Distance | Floating Point Numbers |  |
| Output Parameter | Target Rotation | 3D Vector |  |
| Output Parameter | Target Location | 3D Vector |  |

## **7. Force Exit Aiming State**

**Node Functions**

Forces the Character to exit Aiming Status if the Character is currently in it

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |

## **8. Set Own Attack Target**

**Node Functions**

Sets the Target Entity as its Attack Target

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Whether to Turn Immediately | Boolean |  |

## **9. Trigger Hitbox at Specific Location**

**Node Functions**

Initiates a Hitbox Attack at the specified Location in the World Coordinate System, with configurable attack parameters

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|---------------------------------------|------------------------|-------------|
| Input Parameter | Target Faction Filter | Enumeration |  |
| Input Parameter | Location | 3D Vector |  |
| Input Parameter | Rotate | 3D Vector |  |
| Input Parameter | Damage Coefficient | Floating Point Numbers |  |
| Input Parameter | Damage Increment | Floating Point Numbers |  |
| Input Parameter | Hitbox Entity Type Filter List | Faction List |  |
| Input Parameter | Trigger Type | Enumeration |  |
| Input Parameter | On-Hit Scene Effects | Integer |  |
| Input Parameter | Hitbox Type | Enumeration |  |
| Input Parameter | Scale of Cuboid Hitbox | Enumeration |  |
| Input Parameter | Radius of Sphere Hitbox | Boolean |  |
| Input Parameter | Height of Sector Hitbox | Floating Point Numbers |  |
| Input Parameter | Sector Angle of Sector Hitbox | Floating Point Numbers |  |
| Input Parameter | Sector Radius of Sector Hitbox | Floating Point Numbers |  |
| Input Parameter | Inner Radius of Sector Hitbox | Floating Point Numbers |  |
| Input Parameter | Detection Direction of Sector Hitbox | Enumeration |  |
| Input Parameter | Attack Layer Filter | Enumeration |  |
| Input Parameter | Attack Tag List | String List |  |
| Input Parameter | Elemental Type | Enumeration |  |
| Input Parameter | Elemental Attack Potency | Floating Point Numbers |  |
| Input Parameter | Hit Type | Enumeration |  |
| Input Parameter | Attack Type | Enumeration |  |
| Input Parameter | Interrupt Value | Floating Point Numbers |  |
| Input Parameter | Absolute Damage | Boolean |  |
| Input Parameter | On-Hit Special Effects | Integer |  |
| Input Parameter | Knockback Orientation | Enumeration |  |
| Input Parameter | Block Damage Pop-Up | Boolean |  |
| Input Parameter | On-Hit Scene Effects Offset | 3D Vector |  |
| Input Parameter | On-Hit Scene Effects Rotation | 3D Vector |  |
| Input Parameter | On-Hit Scene Effects Zoom | Floating Point Numbers |  |
| Input Parameter | On-Hit Scene Special Effects Offset | 3D Vector |  |
| Input Parameter | On-Hit Scene Special Effects Rotation | 3D Vector |  |
| Input Parameter | On-Hit Scene Special Effects Zoom | Floating Point Numbers |  |
| Input Parameter | Aggro Multiplier for This Attack | Floating Point Numbers |  |
| Input Parameter | Aggro Increment for This Attack | Integer |  |
| Input Parameter | Hit Level | Enumeration |  |
| Input Parameter | On-Hit Horizontal Impulse | Floating Point Numbers |  |
| Input Parameter | On-Hit Vertical Impulse | Floating Point Numbers |  |

## **10. Add Unit Status**

**Node Functions**

Applies the Unit Status defined by the configuration ID to the Target

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|-----------|-------------|
| Input Parameter | Application Target | Entity |  |
| Input Parameter | Stacks | Integer |  |
| Input Parameter | Unit Status Config ID | Config ID |  |

## **11. Notify Server Node Graph**

**Node Functions**

Notifies the Server Node Graph; supports up to three String parameters

At runtime, forwards logic to the Server Node Graph and triggers the [On Skill Node Call] Event on the Server Node Graph

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------|
| Input Parameter | String 1 | String |  |
| Input Parameter | String 2 | String |  |
| Input Parameter | String 3 | String |  |

## **12. Player Turning**

**Node Functions**

Turns the Player using the configured turning mode

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| Input Parameter | Turning Mode | Enumeration | Includes: Target then Input, Input Direction, Target Direction, Target then Camera, Camera Direction, Input then Target |

## **13. Player Turns to Face Set Direction**

**Node Functions**

Turns the Player toward the direction specified by the 3D Vector configuration

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|-----------|-------------|
| Input Parameter | Orientation | 3D Vector |  |

## **14. Modify Attack Weight**

**Node Functions**

Edits the weight of the current Attack Target

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-------------------------------|------------------------|-------------|
| Input Parameter | Current Attack Target Weight | Floating Point Numbers |  |
| Input Parameter | Forcibly Select a Target Once | Boolean |  |

## **15. Remove Unit Status**

**Node Functions**

Removes the Unit Status corresponding to the specified configuration ID from the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|-----------|-------------|
| Input Parameter | Removal Target | Entity |  |
| Input Parameter | Unit Status Config ID | Config ID |  |

## **16. Remove Specified Character Disruptor Device**

**Node Functions**

Removes the specified type of Character Disruptor Device

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|-------------|------------------------------------------------------------|
| Input Parameter | Disruptor Device Type | Enumeration | Includes: Force Field Device, Ejector, and Traction Device |

## **17. Trigger Hitbox at Specific Location**

**Node Functions**

Initiates a Hitbox Attack at the specified Attachment Point, with configurable attack parameters

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|---------------------------------------|------------------------|-------------|
| Input Parameter | Target Faction Filter | Enumeration |  |
| Input Parameter | Location | String |  |
| Input Parameter | Rotate | 3D Vector |  |
| Input Parameter | Damage Coefficient | 3D Vector |  |
| Input Parameter | Damage Increment | Floating Point Numbers |  |
| Input Parameter | Hitbox Entity Type Filter List | Floating Point Numbers |  |
| Input Parameter | Trigger Type | Faction List |  |
| Input Parameter | On-Hit Scene Effects | Enumeration |  |
| Input Parameter | Hitbox Type | Integer |  |
| Input Parameter | Scale of Cuboid Hitbox | Enumeration |  |
| Input Parameter | Radius of Sphere Hitbox | Enumeration |  |
| Input Parameter | Height of Sector Hitbox | Boolean |  |
| Input Parameter | Sector Angle of Sector Hitbox | Floating Point Numbers |  |
| Input Parameter | Sector Radius of Sector Hitbox | Floating Point Numbers |  |
| Input Parameter | Inner Radius of Sector Hitbox | Floating Point Numbers |  |
| Input Parameter | Detection Direction of Sector Hitbox | Floating Point Numbers |  |
| Input Parameter | Attack Layer Filter | Enumeration |  |
| Input Parameter | Attack Tag List | Enumeration |  |
| Input Parameter | Elemental Type | String List |  |
| Input Parameter | Elemental Attack Potency | Enumeration |  |
| Input Parameter | Hit Type | Floating Point Numbers |  |
| Input Parameter | Attack Type | Enumeration |  |
| Input Parameter | Interrupt Value | Enumeration |  |
| Input Parameter | Absolute Damage | Floating Point Numbers |  |
| Input Parameter | On-Hit Special Effects | Boolean |  |
| Input Parameter | Knockback Orientation | Integer |  |
| Input Parameter | Block Damage Pop-Up | Enumeration |  |
| Input Parameter | On-Hit Scene Effects Offset | Boolean |  |
| Input Parameter | On-Hit Scene Effects Rotation | 3D Vector |  |
| Input Parameter | On-Hit Scene Effects Zoom | 3D Vector |  |
| Input Parameter | On-Hit Scene Special Effects Offset | Floating Point Numbers |  |
| Input Parameter | On-Hit Scene Special Effects Rotation | 3D Vector |  |
| Input Parameter | On-Hit Scene Special Effects Zoom | 3D Vector |  |
| Input Parameter | Aggro Multiplier for This Attack | Floating Point Numbers |  |
| Input Parameter | Aggro Increment for This Attack | Floating Point Numbers |  |
| Input Parameter | Hit Level | Integer |  |
| Input Parameter | On-Hit Horizontal Impulse | Enumeration |  |
| Input Parameter | On-Hit Vertical Impulse | Floating Point Numbers |  |
| Input Parameter | Hit Vertical Impulse | Floating Point Numbers |  |

## **18. Reset Skill Target**

**Node Functions**

Resets the Skill Target and reruns the Skill selection logic to choose a new Target

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |

## **1. Set Local Variable**

**Node Functions**

Sets the value of a local variable

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|---------|-------------|
| Input Parameter | Variable Name | String |  |
| Input Parameter | Variable Value | Generic |  |

## **2. Break Loop**

**Node Functions**

Break out of a Finite Loop. The output pin must connect to the [Break Loop] input parameter of the [Finite Loop] Node

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|----------------|----------------|------|-------------|
|  |  |  |  |

## **3. Finite Loop**

**Node Functions**

From the [Loop Start Value] to the [Loop End Value], the loop iterates, incrementing the Integer by 1 each time. On each iteration, it executes the Nodes connected to [Loop Body]. After a full iteration, it executes the Nodes connected to [Loop Complete].

Use [Break Loop] to end the iteration early

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|------------------|------------------------|---------|-------------|
| Input Parameter | Loop Start Value | Integer |  |
| Input Parameter | Loop Termination Value | Integer |  |
| Output Parameter | Current Loop Value | Integer |  |

## III. Custom Aggro

## **1. Modify the Aggro Value of the Specified Entity Proportionally**

**Node Functions**

Available only in Custom Aggro Mode

Proportionally edits the Target Entity's Aggro Value on the specified Aggro Owner

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------------------|------------------------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Aggro Owner Entity | Entity |  |
| Input Parameter | Modified Aggro Value Ratio | Floating Point Numbers |  |

## **2. Transfer the Aggro Value of the Specified Entity Proportionally**

**Node Functions**

Available only in Custom Aggro Mode

Transfers a percentage of Aggro on the Aggro Owner from the Source Entity to the Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|------------------------|------------------------|-------------|
| Input Parameter | Transfer Target Entity | Entity |  |
| Input Parameter | Transfer Source Entity | Entity |  |
| Input Parameter | Aggro Owner Entity | Entity |  |
| Input Parameter | Transfer Ratio | Floating Point Numbers |  |

## **3. Taunt Target**

**Node Functions**

Available only in Custom Aggro Mode

The Taunter Entity taunts the specified Target Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------|
| Input Parameter | Taunter Entity | Entity |  |
| Input Parameter | Target Entity | Entity |  |

## **4. Remove Target Entity From Aggro List**

**Node Functions**

Available only in Custom Aggro Mode

Removes the Target Entity from the Aggro Owner Entity's Aggro List; this may cause the Target Entity to leave battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|--------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Aggro Owner Entity | Entity |  |

## **5. Clear the Aggro List of the Specified Entity**

**Node Functions**

Available only in Custom Aggro Mode

Clears the Aggro List of the specified Entity; this usually causes the Target to leave battle

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------|
| Input Parameter | Target Entity | Entity |  |

## **6. Set the Aggro Value of the Specified Entity**

**Node Functions**

Available only in Custom Aggro Mode

Sets the Aggro Value of the specified Entity on the Aggro Owner Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|--------------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Aggro Owner Entity | Entity |  |
| Input Parameter | Aggro Value | Integer |  |

## **7. Modify the Aggro Value of the Specified Entity**

**Node Functions**

Available only in Custom Aggro Mode

Edits the Aggro Value of the specified Entity on the Aggro Owner Entity

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|-----------------------|---------|-------------|
| Input Parameter | Target Entity | Entity |  |
| Input Parameter | Aggro Owner Entity | Entity |  |
| Input Parameter | Aggro Value Increment | Integer |  |

## IV. Signal

## 1. **Send Signal to Server Node Graph**

**Node Functions**

Within the skill node graph, signals can be sent to the server node graph, and all server node graphs can listen for this signal.

**Node Parameters**

| Parameter Type | Parameter Name | Type | Description |
|-----------------|----------------|--------|-------------|
| Input Parameter | Signal Name | String |  |