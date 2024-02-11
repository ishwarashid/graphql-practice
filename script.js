fetch('localhost:4000',{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        query:`
            query {
                reviews{
                    id,
                    rating,
                    content
                }
            }
        
        `
    })
})
.then(res => res.json())
.then(data =>{
    console.log(data)
})