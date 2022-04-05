const UserInfo = ({ user }) => <>
  <p>{user.name || user.username} logged in</p>
</>;

export default UserInfo;
