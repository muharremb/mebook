import { useParams } from "react-router-dom";


const ProfilePage = () => {
    const {userId} = useParams();

    return ( 
        <>
            <h2>Profile Page Here</h2>
            <ul>
                <li>About Me</li>
                <li>Posts</li>
                <li>Friends</li>
            </ul>
        </>
        
     );
}
 
export default ProfilePage;