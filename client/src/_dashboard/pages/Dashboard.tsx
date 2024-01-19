
const DashBoard = () => {
  return (
    <div className="w-full">
      <div className="p-5 space-y-8">
        <div>
          <h1>Hi, Hasan</h1>
          <p>Welcome back!</p>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-wrap gap-2 w-full ">
          <div className="dashboard-card">
            <h3>37</h3>
            <p>All Properties</p>
          </div>
          <div className="dashboard-card">
            <h3>37</h3>
            <p>All Properties</p>
          </div>
          <div className="dashboard-card">
            <h3>37</h3>
            <p>All Properties</p>
          </div>
          <div className="dashboard-card">
            <h3>37</h3>
            <p>All Properties</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 ">
        <div className="h-96 w-full lg:w-1/2 md:w-full rounded-lg bg-white p-5 shadow-md flex-col">
          <h2>View Statistics</h2>
        </div>
        <div className="h-96 w-full lg:w-1/3 md:w-1/2 rounded-lg bg-white p-5 shadow-md">
          <h2>Activity</h2>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
