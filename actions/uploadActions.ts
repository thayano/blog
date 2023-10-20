
import path from 'path'

async function savePhotosToLocal(formData: any){
    const files = formData.getAll('files')
    const bufferPromisse = files.map((file: { arrayBuffer: () => Promise<any> }) => (
        file.arrayBuffer()
        .then(data => console.log(data))
    ))

}

export async function uploadPhoto(formdata : any){
    try{
        const newFiles = await savePhotosToLocal(formdata)
    }catch(error : any){
        return (error.message)
    }
}