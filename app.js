   
const ctx1 = document.getElementById('chart1').getContext('2d');
const chart1 = new Chart(ctx1,{
    type: 'bar',
    data:{
        labels: ['GF/60','GA/60'],
        datasets: [
            {
            label: 'Skater Charts',
            data: []   
            }
        ]
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
        labels: ['GF/60','GA/60'],
        datasets: [
            {
             label: 'Skater Charts',
             data: []   
            }
        ]
    }
});


async function getData(name,chart){
    const response = await fetch('http://localhost:5501/api');
    const data = await response.json();
    for (item of data){
        if(name==item.name){
            removeData(chart);
            removeData(chart);
            addData(chart,'GF/60',item.gf);
            addData(chart,'GA/60',item.ga);


        }
    }
}

function searchPlayer(){
    var input1 = document.getElementById('search1');
    input1.addEventListener("keyup", function(event){
        if(event.key=='Enter'){
            getData(input1.value,chart1);
        }
    });

    var input2 = document.getElementById('search2');
    input2.addEventListener("keyup", function(event){
        if(event.key=='Enter'){
            getData(input2.value,chart2);            
        }
    });
}
