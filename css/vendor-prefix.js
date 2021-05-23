const Style =(_=>{
    
    cosnt prop = new Map; // cache 역할 {'속성 이름' : '진짜 브라우저에서 지원하는 속성 이름'}
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
})();