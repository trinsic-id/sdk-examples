import React from "react";
import ChevronDownIcon from "./Icons/ChevronDownIcon";
import ChevronUpIcon from "./Icons/ChevronUpIcon";

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { color, text, profile, className, ...otherProps } = this.props;
    const { open } = this.state;
    const colorClass = `bg-gradient-to-br from-${color}-700 to-${color}-400 text-${text}`;
    const animationClass = `transform transition-all duration-1000 ease-in-out`;
    const mt = open ? "0" : "-100%";

    return (
      <div
        className={`flex flex-col rounded p-4 w-96 ${colorClass} ${className}`}
        {...otherProps}
      >
        <div className="flex flex-col text-xl text-center items-center">
          <img src={"https://ui-avatars.com/api/?name=" + profile.name} className="rounded-full w-12 h-12" alt={profile.name}/>
          <div className="p-3">{profile.name}</div>
        </div>
        <div className="flex flex-col">
            <div className="overflow-hidden">
              <div className={`${animationClass}`} style={{ marginTop: mt }}>
                <div className="text-center">{profile.roleDescription}</div>
              </div>
            </div>
            <div className="flex flex-row w-full text-sm items-center">
              {this.state.open && (
                <ChevronUpIcon
                  className="h-8 w-8 cursor-pointer"
                  onClick={this.toggleDropdown}
                />
              )}
              {!this.state.open && (
                <ChevronDownIcon
                  className="h-8 w-8 cursor-pointer"
                  onClick={this.toggleDropdown}
                />
              )}
            </div>
        </div>
      </div>
    );
  }
}

ProfileCard.defaultProps = {
  color: "primary",
  text: "white",
  profile: {
    name: "",
    roleDescription: "",
    image: null
  },
};

export default ProfileCard;