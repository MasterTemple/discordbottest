const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

axios.get('https://www.bible.com/reading-plans/17399-merry-bright-celebrating-christmas-every-day/day/1')
    .then((res) => {
        const { document } = (new JSDOM(res.data)).window;

        var day = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(4) > div:nth-child(3) > div > p > span:nth-child(1)").textContent;
        console.log(`**${day}**`)


        var title = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > p:nth-child(1)").textContent;
        console.log(`**${title}**`)

        var ref = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(4) > div:nth-child(3) > div > ul").textContent;
        console.log(`Scriptures:\n${ref}\n`);

        var plan = document.querySelectorAll("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5)");
        console.log(plan.textContent);

        Array.from(plan).forEach(function(devo){
            //console.log(devo.textContent);
            //this does nothing
        })

        //var devop1 = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > p:nth-child(3)");
        //console.log(devop1.textContent)
        //var devop2 = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > p:nth-child(5)");
        //console.log(devop2.textContent)
        //var devopn = document.querySelector("#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > ul:nth-child(27)");
        //console.log(devopn.textContent)

        var range = 100;
        for(i = 3;; i++){
            try {
                console.log(document.querySelector(`#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > p:nth-child(${i})`).textContent);
            }
            catch{
                try{
                    console.log(document.querySelector(`#react-app-PlanDiscovery > div > div.subscription-show > div > div:nth-child(5) > div > div > div.devotional > ul:nth-child(${i})`).textContent);
                }
                catch{
                    console.log(`឵឵`);
                    if(('#react-app-PlanDiscovery').length < i-2){
                        break;
                    }
                }
            }
        }

    });

