// import csrfFetch from "../../store/csrf";

// const UploadPhotoForm = ({userProfile}) => {
//     const handleUpload = async e => {
//         e.preventDefault();

//         const formData = new FormData();
        
//         if(profilePhoto) {
//             formData.append('user[photo]', profilePhoto);
//         }
//         const res = await csrfFetch(`/api/users/${userProfile.id}`, {
//             method: 'PUT',
//             body: formData
//         });
//     }
    
//     return ( 
//         <form onSubmit={handleUpload}>
//             <input type="file" onChange={handleFile} />
//             <button>upload</button>
//         </form>
//     );
// }
 
// export default UploadPhotoForm;