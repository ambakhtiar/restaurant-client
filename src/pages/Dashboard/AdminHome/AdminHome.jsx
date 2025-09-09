import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { BiFoodMenu } from "react-icons/bi";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: states = {} } = useQuery({
        queryKey: ["admin-states"],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-states');
            console.log(res.data);
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ["ordaer-states"],
        queryFn: async () => {
            const res = await axiosSecure('/order-stats');
            console.log(res.data);
            return res.data;
        }
    })

    // Custom shape for Bar Chart 
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // Custom shape Pie Chart 
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })

    return (
        <div>
            <h2 className="text-3xl"><span>Hi, Welcome </span>
                {
                    user?.displayName ? user?.displayName : "Back"
                }
            </h2>

            <div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaDollarSign className="text-3xl" />
                        </div>
                        <div className="stat-title">Revenue</div>
                        <div className="stat-value">$ {states.revenue}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaCartShopping className="text-3xl" />
                        </div>
                        <div className="stat-title">New Users</div>
                        <div className="stat-value">{states.orderCount}</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Users</div>
                        <div className="stat-value">{states.userCount}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <BiFoodMenu className="text-3xl" />
                        </div>
                        <div className="stat-title">Menu Items</div>
                        <div className="stat-value">{states.menuItemCount}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 mt-4">
                <div className="w-1/2">
                    <h3 className="text-3xl font-semibold my-4">Quantity</h3>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                <div className="w-1/2">
                    <h3 className="text-3xl font-semibold my-4">Revenue Percentize</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;