module.exports = class Helper
{

    static ParameterChecker(query,requiredParameters)
    {
        let error = false;
        requiredParameters.forEach(parameter => {
            if(typeof query[parameter] == "undefined")
                error = true;
        });
        return error;
    }


    static get DefaultResponse()
    {
        return {
            error: false,
            message: {},
            result: {}
        }
    }

    
    

}
