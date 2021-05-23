
const Style =(_=>{
    
    const prop = new Map; // cache 역할 {'속성 이름' : '진짜 브라우저에서 지원하는 속성 이름'}
    const prefix = 'webkit,moz,ms,chrome,o,khtml'.split(',');
    const NONE = Symbol(); //'속성이 없음'값에 대한 symbol 생성
    const BASE = document.body.style; //어떤 브라우저든, style 태그는 가지고 있음. 속성이 있는지 체크하는 ele

    //표준이름(border-redius)을 인자로 받으면 진짜 지원하는 속성 이름(webkit.border-redius)을 받는 함수
    const getKey = key => {
                prop.has(key)? key = prop.get(key) :              //cache에 있는지 먼저 확인
                (key in BASE)? prop.set(key,key) :                //BASE에 존재하면 cache 저장  
                            !prefix.filter(p=>{                  //prefix와 합친 속성 있는지 확인        
                                 const newKey = '${p}${key[0].toUpperCase()}${key.substr(1)}';
                                        if(newKey in BASE){
                                            prop.set(key,newKey);
                                            key = newKey;
                                            return true;
                                        }  
                                            return false;
                                    }) ? _ : (prop.set(key,key=NONE))
        return key;
    }

    return class{
        constructor(style){this._style = style;}
        get(key){
            return key = getKey(key)=== NONE ? null : this._style[key];
        }
        set(key,val){
            key =  getKey(key);
            if(key !== NONE) this._style[key] = val;
            return this;
        }        
    }
})();



const Rule = class{
    constructor(rule){
        this._rule = rule;
        this._style = new Style(rule.style);
    }
    get(key){
        return this._style.get(key);        
    }
    set(key,val){
        this._style.set(key,val);
        return this;
    }
}


const el = document.querySelector('style');
const sheet = el.sheet;
const rules = sheet.cssRules;
const rule = new Rule(rules[0]);
// 속성이 없는 브라우저로부터 안전하게 css 셋팅
rule.set('borderRadius','20px').set('boxShadow','0 0 0 10px white');
