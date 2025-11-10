import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { BarChart } from 'react-native-chart-kit';
import Card from '../../components/Card';
import BannerAd from '../../components/BannerAd';
import StorageService from '../../services/storage';
import { Statistics } from '../../types';

const StatsScreen = () => {
  const { theme } = useTheme();
  const [stats, setStats] = useState<Statistics | null>(null);

  useEffect(() => {
    loadStatistics();

    // Refresh stats when screen is focused
    const interval = setInterval(loadStatistics, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadStatistics = async () => {
    const statistics = await StorageService.getStatistics();
    setStats(statistics);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  const getLastWeekData = () => {
    if (!stats) return { labels: [], data: [] };

    const today = new Date();
    const labels: string[] = [];
    const data: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en', { weekday: 'short' });

      labels.push(dayName);
      data.push(stats.sessionsPerDay[dateKey] || 0);
    }

    return { labels, data };
  };

  const { labels, data } = getLastWeekData();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Your Statistics</Text>
      </View>

      {stats && (
        <>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.colors.work }]}>
                {stats.totalSessions}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Total Sessions
              </Text>
            </Card>

            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                {formatTime(stats.totalWorkTime)}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Work Time
              </Text>
            </Card>

            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.colors.shortBreak }]}>
                {stats.consecutiveDays}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Day Streak
              </Text>
            </Card>

            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.colors.longBreak }]}>
                {formatTime(stats.totalBreakTime)}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Break Time
              </Text>
            </Card>
          </View>

          <Card style={styles.chartCard}>
            <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
              Last 7 Days Activity
            </Text>
            {data.length > 0 && Math.max(...data) > 0 ? (
              <BarChart
                data={{
                  labels,
                  datasets: [{ data }],
                }}
                width={Dimensions.get('window').width - 80}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: theme.colors.card,
                  backgroundGradientFrom: theme.colors.card,
                  backgroundGradientTo: theme.colors.card,
                  decimalPlaces: 0,
                  color: (opacity = 1) => theme.colors.primary,
                  labelColor: (opacity = 1) => theme.colors.text,
                  style: {
                    borderRadius: 16,
                  },
                  propsForBackgroundLines: {
                    strokeDasharray: '',
                    stroke: theme.colors.border,
                    strokeWidth: 1,
                  },
                }}
                style={styles.chart}
                fromZero
              />
            ) : (
              <Text style={[styles.noDataText, { color: theme.colors.textSecondary }]}>
                No activity data yet. Complete some sessions to see your progress!
              </Text>
            )}
          </Card>

          <Card style={styles.achievementsCard}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              🏆 Achievements
            </Text>
            <View style={styles.achievementsList}>
              {stats.totalSessions >= 1 && (
                <View style={styles.achievementItem}>
                  <Text style={styles.achievementIcon}>🎯</Text>
                  <Text style={[styles.achievementText, { color: theme.colors.text }]}>
                    First Session Complete
                  </Text>
                </View>
              )}
              {stats.totalSessions >= 10 && (
                <View style={styles.achievementItem}>
                  <Text style={styles.achievementIcon}>🔥</Text>
                  <Text style={[styles.achievementText, { color: theme.colors.text }]}>
                    10 Sessions Milestone
                  </Text>
                </View>
              )}
              {stats.consecutiveDays >= 7 && (
                <View style={styles.achievementItem}>
                  <Text style={styles.achievementIcon}>📅</Text>
                  <Text style={[styles.achievementText, { color: theme.colors.text }]}>
                    Week Warrior
                  </Text>
                </View>
              )}
              {stats.totalSessions >= 50 && (
                <View style={styles.achievementItem}>
                  <Text style={styles.achievementIcon}>🏆</Text>
                  <Text style={[styles.achievementText, { color: theme.colors.text }]}>
                    Marathon Champion
                  </Text>
                </View>
              )}
            </View>
          </Card>
        </>
      )}

      <BannerAd />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  chartCard: {
    padding: 20,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    textAlign: 'center',
    padding: 40,
    fontSize: 14,
  },
  achievementsCard: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementText: {
    fontSize: 16,
  },
});

export default StatsScreen;
