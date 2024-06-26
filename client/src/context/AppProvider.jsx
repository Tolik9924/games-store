import React, { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

// Services
import { getUser } from '../services/userService';

// Context
export const CurrentUserContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        const { data } = await getUser(accessToken);
        const updatedUser = { ...data, roleId: data.roleId._id, roleInfo: { ...data.roleId } };
        setCurrentUser(updatedUser);
        setIsLoading(false);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        fetchUser,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AppProvider;
