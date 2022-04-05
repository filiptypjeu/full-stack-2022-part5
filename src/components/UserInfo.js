import PropTypes from "prop-types";

const UserInfo = ({ user }) => <>
  <p>{user.name || user.username} logged in</p>
</>;

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
