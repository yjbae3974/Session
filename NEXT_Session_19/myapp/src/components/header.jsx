const Header = ({onChangeMode, children}) => {
  return (
    <div>
      <h1 onClick={()=>onChangeMode()}>{children}</h1>
    </div>
  );
}

export default Header;