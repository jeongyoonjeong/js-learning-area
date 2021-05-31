// 게임 맵의 상태 maps가 매개변수로 주어질 때, 캐릭터가 상대 팀 진영에 도착하기 위해서 지나가야 하는 칸의 개수의 최솟값을 return 하도록 solution 함수를 완성해주세요. 단, 상대 팀 진영에 도착할 수 없을 때는 -1을 return 해주세요.

// 제한사항
// maps는 n x m 크기의 게임 맵의 상태가 들어있는 2차원 배열로, n과 m은 각각 1 이상 100 이하의 자연수입니다.
// n과 m은 서로 같을 수도, 다를 수도 있지만, n과 m이 모두 1인 경우는 입력으로 주어지지 않습니다.
// maps는 0과 1로만 이루어져 있으며, 0은 벽이 있는 자리, 1은 벽이 없는 자리를 나타냅니다.
// 처음에 캐릭터는 게임 맵의 좌측 상단인 (1, 1) 위치에 있으며, 상대방 진영은 게임 맵의 우측 하단인 (n, m) 위치에 있습니다.

// 입출력 예
// maps	answer
// [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]	11
// [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]	-1


function Position(r,c,dist){
    this.r = r;
    this.c = c;
    this.dist = dist;             //누적거리 축적값
}

function solution(maps) {
    var answer = -1;
    let queue = [];
    
    const maxRow = maps.length;
    const maxCol = maps[0].length;
   
    queue.push(new Position(0,0,1));
    
    while(queue.length > 0){
        let tmp = queue.shift();
        let {r , c, dist}  = tmp;
        
        if(maps[r][c] == 0) continue;               //방문할 수 없는 좌표 리턴-
        
        if(r == maxRow-1 && c == maxCol-1){         //목표 좌표 도착
            answer = dist;
            break;
        }
        
        maps[r][c] = 0;                             //방문 표시
        
        
        if(r-1 >= 0 && maps[r-1][c] === 1)              //위 포지션을 검사하고, 갈 수 있으면 queue에 넣기
            queue.push(new Position(r-1,c,dist+1));
    
        if(c-1 >= 0 && maps[r][c-1] === 1)              //좌 포지션을 검사하고, 갈 수 있으면 queue에 넣기
            queue.push(new Position(r,c-1,dist+1));
   
        if(r+1 < maxRow && maps[r+1][c] === 1)           //아래 포지션을 검사하고, 갈 수 있으면 queue에 넣기
            queue.push(new Position(r+1,c,dist+1));
    
        if(c+1 < maxCol && maps[r][c+1] === 1)           //우 포지션을 검사하고, 갈 수 있으면 queue에 넣기
            queue.push(new Position(r,c+1,dist+1));                
    }
    
    return answer;
}