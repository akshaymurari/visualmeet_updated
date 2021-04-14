const Reducer = (name) => {
    return  (state = {loading: false,value:[],error:""}, action) => {
        switch (action.type) {
            case "request_"+name: return {
                loading: true,
                value:[],
                error:""
            }
            case "success_"+name: return {
                loading: false,
                value:action.payload,
                error:"",
            }
            case "error_"+name: return {
                loading: false,
                value:[],
                error:action.payload
            }
            default: return { ...state }
        }
    }
}
export default Reducer;