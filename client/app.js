   
const ctx1 = document.getElementById('chart1').getContext('2d');
const chart1 = new Chart(ctx1,{
    type: 'bar',
    data:{
        labels: ['GF/60','xGF/60','GA/60','xGA/60'],
        datasets: [
            {
            label: 'Z Score',
            data: [],   
            }
        ]
    },
    options: {
        scales:{
            y: {
                min: -3,
                max: 3

            }
        }

    }
});

function addData(chart,label,data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
} 

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}



const ctx2 = document.getElementById('chart2').getContext('2d');
const chart2 = new Chart(ctx2,{
    type: 'bar',
    data:{
        labels: ['GF/60','xGF/60','GA/60','xGA/60'],
        datasets: [
            {
             label: 'Z Score',
             data: []   
            }
        ]
    },
    options: {
        scales:{
            y: {
                min: -3,
                max: 3

            }
        }

    }
});


async function getData(name,chart){
    const response = await fetch('http://localhost:5501/api'); // change to heroku
    const data = await response.json();
    for (item of data){
        if(name==item.Player){
            removeData(chart);
            removeData(chart);
            removeData(chart);
            removeData(chart);
            addData(chart,'GF/60',((item.GF-data[0].GF)/data[1].GF));
            addData(chart,'xGF/60',((item.xGF-data[0].xGF)/data[1].xGF));
            addData(chart,'GA/60',(-((item.GA-data[0].GA)/data[1].GA)));
            addData(chart,'xGA/60',(-((item.xGA-data[0].xGA)/data[1].xGA)));
        }
    }
}

async function searchPlayer(){
    var sugBox1 = document.getElementById('sugBox1');
    var sugBox2 = document.getElementById('sugBox2');   
    var input1 = document.getElementById('search1');
    var searchBtn1 = document.getElementById('searchBtn1');
    const response = await fetch('http://localhost:5501/api'); //change to heroku 
    const data = await response.json();
    input1.addEventListener("input",function(event){
        let matches = data.filter( player =>{
        const regex = new RegExp(`${input1.value}`,'gi');
        return player.Player.match(regex)
        }); 
        if(matches[0].Player!="Mean Value" && matches[0].Player!= "Standerd Deviation"){
            sugBox1.style.visibility="visible";
            sugBox1.innerText = matches[0].Player;
        }
        else{
            sugBox1.style.visibility="hidden";
            sugBox1.innerText = "";
        }
    });
    sugBox1.onclick=function(){
        input1.value=sugBox1.innerText;
        getData(input1.value,chart1);
        sugBox1.style.visibility="hidden";

    };

    input1.addEventListener("keyup", function(event){
        if(event.key=='Enter'){
            sugBox1.style.visibility="hidden";
            getData(input1.value,chart1);
        }
    });

    var input2 = document.getElementById('search2');
    input2.addEventListener("input",function(event){
        let matches2 = data.filter( player =>{
        const regex2 = new RegExp(`${input2.value}`,'gi');
        return player.Player.match(regex2)
        }); 
        if(matches2[0].Player!="Mean Value" && matches2[0].Player!= "Standerd Deviation"){
            sugBox2.style.visibility="visible";
            sugBox2.innerText = matches2[0].Player;
        }
        else{
            sugBox2.style.visibility="hidden";
            sugBox2.innerText = "";
        }
    });
    sugBox2.onclick=function(){
        input2.value=sugBox2.innerText;
        getData(input2.value,chart2);
        sugBox2.style.visibility="hidden";

    };
    input2.addEventListener("keyup", function(event){
        if(event.key=='Enter'){
            sugBox2.style.visibility="hidden";
            getData(input2.value,chart2);            
        }
    });
    searchBtn1.onclick=function(){
        getData(input1.value,chart1);
        sugBox1.style.visibility="hidden";
    }
}
