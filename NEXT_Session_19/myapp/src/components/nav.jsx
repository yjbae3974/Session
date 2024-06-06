const Nav = (props) => {
    return (
        <>
            <nav>
                <ol>
                    {props.list.map((item) => (
                        <li key={item.id}>
                            <div onClick={()=>{props.onChangeMode(item.id)}} >{item.title}: {item.content}</div>
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
};

export default Nav;
