// components/GitHubSection.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CalendarDays,
  Users,
  GitPullRequest,
  Moon,
  Sun,
  Github
} from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import ActivityCalendar from 'react-activity-calendar';

const GitHubSection = () => {
  const [stats, setStats] = useState({
    contributions: 0,
    followers: 0,
    pullRequests: 0
  });

  const [year, setYear] = useState(new Date().getFullYear());
  const [darkMode, setDarkMode] = useState(true);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = 'mukundjha-mj';

  useEffect(() => {
    const fetchCalendarData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`);
        if (!res.ok) {
          throw new Error(`API response status: ${res.status}`);
        }
        const json = await res.json();
        
        if (json.contributions && json.contributions.length > 0) {
          setCalendarData(json.contributions);
          
          // Update contributions count from calendar data
          const totalContributions = json.contributions.reduce((total, day) => total + day.count, 0);
          setStats(prev => ({
            ...prev,
            contributions: totalContributions
          }));
        } else {
          console.error('No contribution data found');
          // Provide empty but valid data structure to avoid errors
          setCalendarData([
            { date: '2023-01-01', count: 0, level: 0 }
          ]);
          setError('No contribution data available');
        }
      } catch (err) {
        console.error('Failed to fetch calendar data:', err);
        setError('Failed to load contribution data');
        // Provide empty but valid data structure to avoid errors
        setCalendarData([
          { date: '2023-01-01', count: 0, level: 0 }
        ]);
      }
    };

    const fetchGitHubStats = async () => {
      try {
        const [userRes, prRes] = await Promise.all([
          axios.get(`https://api.github.com/users/${username}`),
          axios.get(`https://api.github.com/search/issues?q=is:pr+author:${username}`)
        ]);

        setStats(prev => ({
          ...prev,
          followers: userRes.data.followers || 0,
          pullRequests: prRes.data.total_count || 0
        }));
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
    fetchGitHubStats();
  }, [year, username]);

  // UI Theme variables for component styling
  const baseTheme = {
    dark: {
      background: 'bg-gray-900',
      card: 'bg-gray-800',
      text: 'text-gray-100',
      border: 'border-gray-700',
      hover: 'hover:bg-gray-700',
      statBg: 'bg-gray-800',
      selectBg: 'bg-gray-800',
      selectContent: 'bg-gray-900'
    },
    light: {
      background: 'bg-gray-100',
      card: 'bg-white',
      text: 'text-gray-800',
      border: 'border-gray-300',
      hover: 'hover:bg-gray-200',
      statBg: 'bg-gray-100',
      selectBg: 'bg-white',
      selectContent: 'bg-white'
    }
  };

  const theme = darkMode ? baseTheme.dark : baseTheme.light;

  return (
    <div
      className={`${theme.card} ${theme.text} p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto transition-colors duration-300`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Github size={24} />
          <h2 className="text-xl font-bold">GitHub Contributions</h2>
        </div>
        <div className="flex items-center gap-4">
          <Select.Root value={String(year)} onValueChange={(v) => setYear(Number(v))}>
            <Select.Trigger className={`${theme.selectBg} ${theme.text} px-3 py-1.5 rounded-md ${theme.border} border text-sm flex items-center gap-1`}>
              <Select.Value />
              <span className="text-xs ml-1">▼</span>
            </Select.Trigger>
            <Select.Content className={`${theme.selectContent} ${theme.text} rounded-md ${theme.border} border mt-1 z-10`}>
              <Select.Viewport>
                {[...Array(5)].map((_, i) => {
                  const y = new Date().getFullYear() - i;
                  return (
                    <Select.Item 
                      key={y} 
                      value={String(y)} 
                      className={`px-3 py-1.5 cursor-pointer ${theme.hover} outline-none`}
                    >
                      <Select.ItemText>{y}</Select.ItemText>
                    </Select.Item>
                  );
                })}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${theme.border} border hover:opacity-80 transition-opacity`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-hidden pb-2">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-sm">Loading contribution data...</div>
          </div>
        ) : calendarData.length > 0 ? (
          <div className="py-2">
            <ActivityCalendar
              data={calendarData}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#05ff54'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
              }}
              level={5}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              showWeekdayLabels={false}
              hideColorLegend={false}
              hideMonthLabels={false}
              monthLabelsHeight={20}
              monthSpacing={16}
              labels={{
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                totalCount: '{{count}} contributions in {{year}}'
              }}
              
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <div className="text-sm">No contribution data available for {year}</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className={`${theme.statBg} p-3 rounded-lg ${theme.border} border flex items-center gap-3`}>
          <div className={`p-2 rounded-full ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
            <CalendarDays size={18} className={darkMode ? 'text-green-400' : 'text-green-600'} />
          </div>
          <div>
            <div className="text-lg font-semibold">{stats.contributions}</div>
            <div className="text-xs opacity-80">Contributions</div>
          </div>
        </div>
        
        <div className={`${theme.statBg} p-3 rounded-lg ${theme.border} border flex items-center gap-3`}>
          <div className={`p-2 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
            <Users size={18} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </div>
          <div>
            <div className="text-lg font-semibold">{stats.followers}</div>
            <div className="text-xs opacity-80">Followers</div>
          </div>
        </div>
        
        <div className={`${theme.statBg} p-3 rounded-lg ${theme.border} border flex items-center gap-3`}>
          <div className={`p-2 rounded-full ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <GitPullRequest size={18} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
          </div>
          <div>
            <div className="text-lg font-semibold">{stats.pullRequests}</div>
            <div className="text-xs opacity-80">Pull Requests</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-center opacity-70">
        <a 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-100"
        >
          @{username}
        </a>
      </div>
    </div>
  );
};

export default GitHubSection;