export async function wait(timeMS: number){
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve('resolved'); 
        }, timeMS);
    })
}