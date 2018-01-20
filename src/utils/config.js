// const environment = "production";
const environment = "development";
const config = {
    production: {
        auth_url: "",
        api_url: ""
    },
    development: {
        auth_url: "https://requestb.in/sgc3hbsg",//"http://127.0.0.1:5000/auth",
        api_url: "https://requestb.in/sgc3hbsg"//"http://127.0.0.1:5000/api"

    }
}

Object.freeze(config)
export default  config[environment]
