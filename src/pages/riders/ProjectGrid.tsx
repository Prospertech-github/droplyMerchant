import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
// import menu form headless ui
import { Menu } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import { useNavigate } from "react-router-dom";

const ProjectGrid = ({ rider }: { rider: Rider }) => {
  const navigate = useNavigate();
  // handleClick to view project single page
  const handleClick = (rider: Rider) => {
    navigate(`/riders/${rider.id}`);
  };

  return (
    // @ts-ignore
    <Card>
      {/* header */}
      <header className="flex justify-between items-end">
        <div className="flex space-x-4 items-center rtl:space-x-reverse">
          <div className="flex-none">
            <div className="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
              {rider.user.first_name.charAt(0) + rider.user.last_name.charAt(0)}
            </div>
          </div>
          <div className="font-medium text-base leading-6">
            <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
              {rider.user.first_name} {rider.user.last_name}
            </div>
          </div>
        </div>
        <div>
          <Dropdown
            classMenuItems=" w-[130px]"
            label={
              <span className="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }>
            <div>
              <Menu.Item onClick={() => handleClick(rider)}>
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse">
                  <span className="text-base">
                    <Icon icon="heroicons:eye" />
                  </span>
                  <span>View</span>
                </div>
              </Menu.Item>
              <Menu.Item onClick={() => {}}>
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse">
                  <span className="text-base">
                    <Icon icon="heroicons-outline:pencil-alt" />
                  </span>
                  <span>Edit</span>
                </div>
              </Menu.Item>
              <Menu.Item onClick={() => {}}>
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse">
                  <span className="text-base">
                    <Icon icon="heroicons-outline:trash" />
                  </span>
                  <span>Delete</span>
                </div>
              </Menu.Item>
            </div>
          </Dropdown>
        </div>
      </header>
      <div className="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-8">{rider.user.email}</div>
      <div className="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-8">{rider.user.phone}</div>
      <div className="flex space-x-4 rtl:space-x-reverse">
        {/* start date */}
        {/* <div>
          <span className="block date-label">Start date</span>
          <span className="block date-text">{

          }</span>
        </div> */}
        {/* end date */}
        {/* <div>
          <span className="block date-label">Start date</span>
          <span className="block date-text">{endDate}</span>
        </div> */}
      </div>
    </Card>
  );
};

export default ProjectGrid;
