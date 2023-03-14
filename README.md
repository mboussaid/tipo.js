# tipo.js
a minimal javascript library for types
# Get Started
## Syntax
```javascript
const {useType,types} = tipo
// useType(initialValue,type)
```
## Example
```javascript 
const {useType,types} = tipo
const username = useType(null,types.string)
username.value = 1 // Error
username.value = 'ahmed' // valid

```
