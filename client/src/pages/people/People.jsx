import "./people.scss";
import Post1 from "../../assets/post-1.jpg";
import Post2 from "../../assets/post-2.jpg";
import Post3 from "../../assets/post-3.jpg";

const People = () => {

    //TEMPORARY
    const users = [
        {
            id: 1,
            name: "John Doe",
            img: Post1,
        },
        {
            id: 2,
            name: "Jane Doe",
            img: Post2,
        },
        {
            id: 3,
            name: "Albert Fisher",
            img: Post3,
        },
        {
            id: 4,
            name: "Jane Doe",
            img: Post1,
        },
        {
            id: 5,
            name: "Jane Smith",
            img: Post2,
        },
        {
            id: 6,
            name: "Jonas Evie",
            img: Post3,
        },
    ]

    return (
        <div className='people'>
            <div className="title">
                <span>All users</span>
            </div>

            <div className="users">
                {users.map(user => (
                    <div className="user-card">
                        <img src={user.img} alt="user-img" />
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default People