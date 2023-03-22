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
        alert("hi");
        const emailRegex = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;
        // let emails = document.body.innerHTML.match(emailRegex);
        let header = document.getElementsByClassName("ha")[0].getElementsByTagName("h2")[0].innerHTML;
        alert(header);
    }
}