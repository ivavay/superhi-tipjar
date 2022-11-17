const web3 = new Web3(Web3.givenProvider)

const form = document.querySelector("form")


//connect to metamask digital wallet 
const send = async function(amount){
   const accounts = await window.ethereum.request({ method: "eth_requestAccounts"})
    //convert ether to wei 
   const wei = web3.utils.toWei(amount, "ether")
    // see if more than one account connected 
    if (accounts.length > 0) {
        window.ethereum.request({
            method: "eth_sendTransaction", 
            params: [{
                from: accounts[0], 
                // replace to account with the account's string you want to send it to
                to: accounts[1],
                value: wei
            }]
        })
    }
}
// if you have digital wallet, shows tip jar 
if (window.ethereum) {
    form.classList.add("has-eth")
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
   
    if (window.ethereum) {
        const input = form.querySelector("input")
        send(input.value)
    
    } else {
        alert("Please install a digital wallet")
    }
})