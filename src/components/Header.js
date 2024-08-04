import React from "react";
import { Header, Icon, Menu } from "semantic-ui-react";

const HeaderComponent = () => {
  return (
    <Menu className="ui violet inverted pointer">
      <Menu.Item className="link">
        <Header as="h1" inverted>
          <Icon name="dollar sign" />
          The Royal Bank of Flatiron
        </Header>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item className="link">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item className="link">
          <Icon name="file alternate" />
          Reports
        </Menu.Item>
        <Menu.Item className="link">
          <Icon name="user" />
          Profile
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default HeaderComponent;
