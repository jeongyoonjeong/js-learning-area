var el = ((tag, attrs={}) => Object.entries(attrs).reduce((el,v)=>{
    console.log(el[v[0]],v[1])
        typeof(el[v[0]]) === 'function' ? el[v[0]](v[1]) : el[v[0]] = v[1]
        return el;
},document.createElement(tag)))('div',{innerHTML: '내용'})