'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups, isLoading, isError } = useGroups();

  if (isLoading) return <p>Loading groups...</p>;
  if (isError) return <p>Error loading groups.</p>;
  if (groups.length === 0) return <p>No groups found.</p>;


  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => (
        <h2 key={group.id}>
          {group.name}
        </h2>
      ))}
    </div>
  );
};

export default Groups;