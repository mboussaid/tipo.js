const tipo = {
    types:{},
    useType(value,type){
        const isValidTypeFunction = (_value,isFirstCheck)=>{
            let isValidType = true;
            if(type){
                if(tipo.types[type]){
                    switch(type){
                        case tipo.types.string:
                            if(typeof _value !== "string"){
                                isValidType = false
                            }
                            break;
                        case tipo.types.number:
                            if(typeof _value !== "number"){
                                isValidType = false
                            }
                        case tipo.types.object:
                            if(typeof _value !== "object"){
                                isValidType = false
                            }
                            break;
                        case tipo.types.array:
                            if(!Array.isArray(_value)){
                                isValidType = false
                            }
                            break;
                        case tipo.types.boolean:
                            if(!(_value === true || _value === false)){
                                isValidType = false
                            }
                            break;
                        case tipo.types.float:
                            if(!(Number(_value) === _value && _value % 1 !== 0)){
                                isValidType = false
                            }
                            break;
                    }
                }else{
                    if(!(value instanceof type)){
                        if(isFirstCheck && value === null){
                            isValidType = true
                        }else{
                            isValidType = false
                        }
                    }
                }
            }
            return isValidType;
        }
        if(!isValidTypeFunction(value,true)){
            throw new Error('Invalid type: the type must be a '+(type.name ? type.name : type))
        }
        return new Proxy({
            value:value
        },{
            get(target, prop){
               return target[prop]
            },
            set(target, property, value) {
                if(!isValidTypeFunction(value,false)){
                    throw new Error('Invalid type: the type must be a '+(type.name ? type.name : type))
                }
                target[property] = value;
            }
        })
    }
};
['number','string','object','array','boolean','float']
.forEach(type=>{
    tipo.types[type] = type;
})
if(typeof module === "object" && module.exports){
    module.exports = {
        useType,
        types
    };
}
