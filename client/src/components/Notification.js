import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  return (
    <div
      className={`${notification.content === null ? 'hidden' : ''} ${
        notification.type === 'alert' ? 'text-red-600' : 'text-green-600'
      } bg-orange-200 font-black text-xl text-center`}
    >
      {notification.content}
    </div>
  );
};

export default Notification;
