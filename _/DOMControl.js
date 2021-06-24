export const el = ((tag, attrs={}) => Object.entries(attrs).reduce((el,attr)=>{
    console.log(el[attr[0]],attr[1])
        typeof(el[attr[0]]) === 'function' ? el[attr[0]](attr[1]) : el[attr[0]] = attr[1]
        return el;
},document.createElement(tag)));

