import axios from "axios";
for (let i = 0; i < 1000; i++) {
    axios.get("http://localhost:3000").then((res) => {
        console.log(res.data)
    })
}