/**
 * Created by xuzhihan on 2017/3/8.
 */
myApp.filterProvider.register("abs",function () {
    return function (inputData,val) {
        if(isNaN(inputData)){
            return "0";
        }
        if(!val || isNaN(val)){
            return Math.abs(inputData);
        }

        return Math.abs(inputData) == val;

    }
});