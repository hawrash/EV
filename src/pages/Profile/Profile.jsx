import { useState, useEffect } from "react";
import styles from "../../pages/Profile/Profile.module.scss";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.profileContainer}>
      <img 
        src={user.picture || '/default-profile.png'} 
        alt={`${user.name}'s profile`} 
        className={styles.profilePicture} 
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
