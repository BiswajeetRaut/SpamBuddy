
let scrapeEmails = document.getElementById("scrapeEmails");
if(scrapeEmails)
{
    // alert("hello");
    scrapeEmails.addEventListener('click', async()=>{
        // alert("hello");
        let [tab]= await chrome.tabs.query({active:true,currentWindow:true});
        chrome.scripting.executeScript({
            target:{tabId: tab.id},
            func: scrapeEmailsFromPage,
        });
    })

    function scrapeEmailsFromPage()
    {
        // alert("hi");
        const emailRegex = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;
        let emails = document.body.innerHTML.match(emailRegex);
        // alert(emails[0]);
        let header = document.getElementsByClassName("ha")[0].getElementsByTagName("h2")[0].innerText;
        // alert(header);
        console.log(header);
        console.log(emails);
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'b0e7b96d7cmsha7a05484d608c8dp17cdf6jsne3c040eb5b6a',
                'X-RapidAPI-Host': 'despam-spam-filter.p.rapidapi.com'
            },
            body: `{"text":"${header}"}`
        };
        
        fetch('https://despam-spam-filter.p.rapidapi.com/api/v1/api-hub/spam-prediction', options)
            .then(response => response.json())
            .then(response => {console.log(response);
            alert(response.prediction);
            })
            .catch(err => {console.error(err)
            alert("we are facing a connectivity issue please try again in a while");}
            );
    }
}