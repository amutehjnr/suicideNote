// src/components/AffiliateDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Icon } from './shared/Icons';
import styles from './AffiliateDashboard.module.css';
import AffiliateService from '../services/AffiliateService';
import PaymentService from '../services/PaymentService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AffiliateDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    accountName: '',
    bankCode: '',
    bankName: ''
  });
  const [hasBankDetails, setHasBankDetails] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    medium: '',
    source: ''
  });
  const [payoutAmount, setPayoutAmount] = useState('');
  const [period, setPeriod] = useState('month');
  const [copiedLink, setCopiedLink] = useState('');
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [dataLoadErrors, setDataLoadErrors] = useState({});

  // Check if user is affiliate on mount
  useEffect(() => {
    checkAffiliateStatus();
  }, []);

  const checkAffiliateStatus = async () => {
    try {
      const result = await AffiliateService.checkAffiliateStatus();
      if (result.isAffiliate) {
        setIsAffiliate(true);
        loadDashboardData();
      } else {
        setIsAffiliate(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking affiliate status:', error);
      setIsLoading(false);
      toast.error('Failed to check affiliate status');
    }
  };

  const loadDashboardData = async () => {
    setIsLoading(true);
    const errors = {};
    
    try {
      // Load dashboard data first (most important)
      const dashboardRes = await AffiliateService.getDashboard();
      if (dashboardRes.success) {
        setDashboardData(dashboardRes.data);
      } else {
        errors.dashboard = dashboardRes.error;
      }

      // Load earnings (might be empty for new affiliates)
      try {
        const earningsRes = await AffiliateService.getEarnings();
        if (earningsRes.success) {
          setEarnings(earningsRes.data);
        } else {
          errors.earnings = earningsRes.error;
          // Set default earnings if none
          setEarnings({
            total: { amount: 0, formatted: '₦0' },
            pending: { amount: 0, formatted: '₦0' },
            paid: { amount: 0, formatted: '₦0' },
            thisMonth: { amount: 0, formatted: '₦0' },
            lastMonth: { amount: 0, formatted: '₦0' },
            byCampaign: []
          });
        }
      } catch (e) {
        console.error('Earnings fetch error:', e);
        errors.earnings = 'Failed to fetch earnings';
        setEarnings({
          total: { amount: 0, formatted: '₦0' },
          pending: { amount: 0, formatted: '₦0' },
          paid: { amount: 0, formatted: '₦0' },
          thisMonth: { amount: 0, formatted: '₦0' },
          lastMonth: { amount: 0, formatted: '₦0' },
          byCampaign: []
        });
      }

      // Load referrals
      try {
        const referralsRes = await AffiliateService.getReferrals(1, 20);
        if (referralsRes.success) {
          setReferrals(referralsRes.data.referrals || []);
        } else {
          errors.referrals = referralsRes.error;
          setReferrals([]);
        }
      } catch (e) {
        console.error('Referrals fetch error:', e);
        errors.referrals = 'Failed to fetch referrals';
        setReferrals([]);
      }

      // Load campaigns
      try {
        const campaignsRes = await AffiliateService.getCampaigns();
        if (campaignsRes.success) {
          setCampaigns(campaignsRes.data || []);
        } else {
          errors.campaigns = campaignsRes.error;
          setCampaigns([]);
        }
      } catch (e) {
        console.error('Campaigns fetch error:', e);
        errors.campaigns = 'Failed to fetch campaigns';
        setCampaigns([]);
      }

      // Load bank details
      try {
        const bankRes = await AffiliateService.getBankDetails();
        if (bankRes.success) {
          setBankDetails(bankRes.data.bankDetails || {});
          setHasBankDetails(bankRes.data.hasBankDetails || false);
        } else {
          errors.bank = bankRes.error;
          setHasBankDetails(false);
        }
      } catch (e) {
        console.error('Bank details fetch error:', e);
        errors.bank = 'Failed to fetch bank details';
        setHasBankDetails(false);
      }

      setDataLoadErrors(errors);
      
      // Show warning if some data failed to load
      if (Object.keys(errors).length > 0) {
        console.warn('Some data failed to load:', errors);
        toast.error('Some dashboard data could not be loaded');
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPerformanceReport = async (selectedPeriod) => {
    try {
      const result = await AffiliateService.getPerformanceReport(selectedPeriod);
      if (result.success) {
        setPerformance(result.data);
      } else {
        toast.error(result.error || 'Failed to load performance report');
      }
    } catch (error) {
      console.error('Performance report error:', error);
      toast.error('Failed to load performance report');
    }
  };

  useEffect(() => {
    if (isAffiliate && activeTab === 'performance') {
      loadPerformanceReport(period);
    }
  }, [activeTab, period, isAffiliate]);

  const handleRegisterAffiliate = async () => {
    setIsLoading(true);
    try {
      const result = await AffiliateService.registerAffiliate();
      if (result.success) {
        toast.success('Successfully registered as an affiliate!');
        setIsAffiliate(true);
        loadDashboardData();
      } else {
        toast.error(result.error || 'Failed to register as affiliate');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register as affiliate');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name) {
      toast.error('Campaign name is required');
      return;
    }

    setIsLoading(true);
    try {
      const result = await AffiliateService.createCampaign(newCampaign);
      if (result.success) {
        toast.success('Campaign created successfully!');
        setShowCampaignModal(false);
        setNewCampaign({ name: '', description: '', medium: '', source: '' });
        
        // Refresh campaigns
        const campaignsRes = await AffiliateService.getCampaigns();
        if (campaignsRes.success) setCampaigns(campaignsRes.data);
      } else {
        toast.error(result.error || 'Failed to create campaign');
      }
    } catch (error) {
      console.error('Create campaign error:', error);
      toast.error('Failed to create campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBankDetails = async () => {
    if (!bankDetails.accountNumber || !bankDetails.accountName || !bankDetails.bankCode || !bankDetails.bankName) {
      toast.error('All bank details are required');
      return;
    }

    setIsLoading(true);
    try {
      const result = await AffiliateService.updateBankDetails(bankDetails);
      if (result.success) {
        toast.success('Bank details updated successfully!');
        setHasBankDetails(true);
      } else {
        toast.error(result.error || 'Failed to update bank details');
      }
    } catch (error) {
      console.error('Update bank details error:', error);
      toast.error('Failed to update bank details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPayout = async () => {
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(payoutAmount) * 100; // Convert to kobo

    setIsLoading(true);
    try {
      const result = await AffiliateService.requestPayout(amount);
      if (result.success) {
        toast.success('Payout requested successfully!');
        setPayoutAmount('');
        
        // Refresh earnings
        const earningsRes = await AffiliateService.getEarnings();
        if (earningsRes.success) setEarnings(earningsRes.data);
      } else {
        toast.error(result.error || 'Failed to request payout');
      }
    } catch (error) {
      console.error('Request payout error:', error);
      toast.error('Failed to request payout');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(text);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '₦0';
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount / 100).replace('NGN', '₦');
    } catch (e) {
      return '₦0';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'N/A';
    }
  };

  if (isLoading && !dashboardData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your affiliate dashboard...</p>
      </div>
    );
  }

  if (!isAffiliate) {
    return (
      <div className={styles.container}>
        <div className={styles.registerCard}>
          <div className={styles.registerIcon}>💰</div>
          <h1 className={styles.registerTitle}>Become an Affiliate Partner</h1>
          <p className={styles.registerSubtitle}>
            Earn 50% commission on every sale you refer. Share the book and get paid!
          </p>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <Icon name="CheckCircle" className={styles.benefitIcon} />
              <span>50% commission per sale</span>
            </div>
            <div className={styles.benefitItem}>
              <Icon name="CheckCircle" className={styles.benefitIcon} />
              <span>Instant affiliate link</span>
            </div>
            <div className={styles.benefitItem}>
              <Icon name="CheckCircle" className={styles.benefitIcon} />
              <span>Track your earnings</span>
            </div>
            <div className={styles.benefitItem}>
              <Icon name="CheckCircle" className={styles.benefitIcon} />
              <span>7-day payouts</span>
            </div>
          </div>

          <button 
            onClick={handleRegisterAffiliate}
            className={styles.registerButton}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register as Affiliate →'}
          </button>

          <p className={styles.registerNote}>
            No approval needed. Start earning immediately!
          </p>
        </div>
      </div>
    );
  }

  // Use earnings data if available, otherwise use dashboard data
  const displayEarnings = earnings || dashboardData?.earnings || {
    total: { formatted: '₦0' },
    pending: { formatted: '₦0' },
    paid: { formatted: '₦0' }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Affiliate Dashboard</h1>
          <div className={styles.headerStats}>
            <div className={styles.headerStat}>
              <span className={styles.headerStatLabel}>Total Earnings</span>
              <span className={styles.headerStatValue}>
                {displayEarnings.total?.formatted || '₦0'}
              </span>
            </div>
            <div className={styles.headerStat}>
              <span className={styles.headerStatLabel}>Pending</span>
              <span className={styles.headerStatValue}>
                {displayEarnings.pending?.formatted || '₦0'}
              </span>
            </div>
            <div className={styles.headerStat}>
              <span className={styles.headerStatLabel}>Referrals</span>
              <span className={styles.headerStatValue}>
                {dashboardData?.stats?.totalReferrals || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'campaigns' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'referrals' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('referrals')}
        >
          Referrals
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'performance' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'payouts' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('payouts')}
        >
          Payouts
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Overview Tab */}
        {activeTab === 'overview' && dashboardData && (
          <div className={styles.overview}>
            {/* Affiliate Link */}
            <div className={styles.linkCard}>
              <h3 className={styles.linkCardTitle}>Your Affiliate Link</h3>
              <div className={styles.linkDisplay}>
                <code className={styles.linkCode}>{dashboardData.affiliate?.link}</code>
                <button
                  onClick={() => copyToClipboard(dashboardData.affiliate?.link)}
                  className={styles.copyButton}
                >
                  <Icon name="Copy" />
                  <span>Copy</span>
                </button>
              </div>
              <p className={styles.linkNote}>
                Share this link to earn 50% commission on every sale!
              </p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>💰</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Total Earnings</span>
                  <span className={styles.statValue}>{dashboardData.earnings?.formattedTotal || '₦0'}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⏳</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Pending</span>
                  <span className={styles.statValue}>{dashboardData.earnings?.formattedPending || '₦0'}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Paid</span>
                  <span className={styles.statValue}>{dashboardData.earnings?.formattedPaid || '₦0'}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>👥</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Total Clicks</span>
                  <span className={styles.statValue}>{dashboardData.stats?.totalClicks || 0}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📊</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Conversion Rate</span>
                  <span className={styles.statValue}>
                    {dashboardData.stats?.conversionRate?.toFixed(1) || '0'}%
                  </span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📅</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Joined</span>
                  <span className={styles.statValue}>
                    {formatDate(dashboardData.affiliate?.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Referrals */}
            {referrals.length > 0 && (
              <div className={styles.recentSection}>
                <h3 className={styles.sectionTitle}>Recent Referrals</h3>
                <div className={styles.referralsList}>
                  {referrals.slice(0, 5).map((referral) => (
                    <div key={referral.id} className={styles.referralItem}>
                      <div className={styles.referralInfo}>
                        <span className={styles.referralName}>{referral.customer}</span>
                        <span className={styles.referralEbook}>{referral.ebook}</span>
                      </div>
                      <div className={styles.referralMeta}>
                        <span className={styles.referralAmount}>{referral.amount}</span>
                        <span className={styles.referralCommission}>
                          +{referral.commission}
                        </span>
                        <span className={styles.referralDate}>{formatDate(referral.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Campaigns Preview */}
            {campaigns.length > 0 && (
              <div className={styles.recentSection}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Top Campaigns</h3>
                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className={styles.viewAllButton}
                  >
                    View All →
                  </button>
                </div>
                <div className={styles.campaignsPreview}>
                  {campaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.name} className={styles.campaignPreview}>
                      <h4 className={styles.campaignPreviewName}>{campaign.name}</h4>
                      <div className={styles.campaignPreviewStats}>
                        <span>{campaign.clicks} clicks</span>
                        <span>{campaign.conversions} conversions</span>
                        <span>{formatCurrency(campaign.earnings)} earned</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rest of your tabs remain the same */}
        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className={styles.campaigns}>
            <div className={styles.campaignsHeader}>
              <h2 className={styles.tabTitle}>Your Campaigns</h2>
              <button
                onClick={() => setShowCampaignModal(true)}
                className={styles.createButton}
              >
                <Icon name="Plus" /> New Campaign
              </button>
            </div>

            {campaigns.length === 0 ? (
              <div className={styles.emptyState}>
                <p>You haven't created any campaigns yet.</p>
                <button
                  onClick={() => setShowCampaignModal(true)}
                  className={styles.emptyStateButton}
                >
                  Create Your First Campaign
                </button>
              </div>
            ) : (
              <div className={styles.campaignsGrid}>
                {campaigns.map((campaign) => (
                  <div key={campaign.name} className={styles.campaignCard}>
                    <h3 className={styles.campaignName}>{campaign.name}</h3>
                    <div className={styles.campaignStats}>
                      <div className={styles.campaignStat}>
                        <span className={styles.campaignStatLabel}>Clicks</span>
                        <span className={styles.campaignStatValue}>{campaign.clicks}</span>
                      </div>
                      <div className={styles.campaignStat}>
                        <span className={styles.campaignStatLabel}>Conversions</span>
                        <span className={styles.campaignStatValue}>{campaign.conversions}</span>
                      </div>
                      <div className={styles.campaignStat}>
                        <span className={styles.campaignStatLabel}>Conv. Rate</span>
                        <span className={styles.campaignStatValue}>{campaign.conversionRate}%</span>
                      </div>
                      <div className={styles.campaignStat}>
                        <span className={styles.campaignStatLabel}>Earnings</span>
                        <span className={styles.campaignStatValue}>{formatCurrency(campaign.earnings)}</span>
                      </div>
                    </div>
                    <div className={styles.campaignLink}>
                      <code className={styles.campaignLinkCode}>{campaign.link}</code>
                      <button
                        onClick={() => copyToClipboard(campaign.link)}
                        className={styles.copySmallButton}
                      >
                        <Icon name="Copy" />
                      </button>
                    </div>
                    <p className={styles.campaignCreated}>
                      Created: {formatDate(campaign.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className={styles.referrals}>
            <h2 className={styles.tabTitle}>Your Referrals</h2>
            
            {referrals.length === 0 ? (
              <div className={styles.emptyState}>
                <p>You haven't made any referrals yet.</p>
                <p className={styles.emptyStateSub}>
                  Share your affiliate link to start earning!
                </p>
              </div>
            ) : (
              <div className={styles.referralsTable}>
                <div className={styles.referralsHeader}>
                  <span>Customer</span>
                  <span>Ebook</span>
                  <span>Amount</span>
                  <span>Commission</span>
                  <span>Date</span>
                </div>
                {referrals.map((referral) => (
                  <div key={referral.id} className={styles.referralRow}>
                    <span className={styles.referralCell}>
                      <span className={styles.referralCellLabel}>Customer:</span>
                      {referral.customer}
                    </span>
                    <span className={styles.referralCell}>
                      <span className={styles.referralCellLabel}>Ebook:</span>
                      {referral.ebook}
                    </span>
                    <span className={styles.referralCell}>
                      <span className={styles.referralCellLabel}>Amount:</span>
                      {referral.amount}
                    </span>
                    <span className={styles.referralCell}>
                      <span className={styles.referralCellLabel}>Commission:</span>
                      <span className={styles.commissionAmount}>{referral.commission}</span>
                    </span>
                    <span className={styles.referralCell}>
                      <span className={styles.referralCellLabel}>Date:</span>
                      {formatDate(referral.date)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className={styles.performance}>
            <div className={styles.performanceHeader}>
              <h2 className={styles.tabTitle}>Performance Report</h2>
              <div className={styles.periodSelector}>
                <button
                  className={`${styles.periodButton} ${period === 'week' ? styles.activePeriod : ''}`}
                  onClick={() => setPeriod('week')}
                >
                  Week
                </button>
                <button
                  className={`${styles.periodButton} ${period === 'month' ? styles.activePeriod : ''}`}
                  onClick={() => setPeriod('month')}
                >
                  Month
                </button>
                <button
                  className={`${styles.periodButton} ${period === 'quarter' ? styles.activePeriod : ''}`}
                  onClick={() => setPeriod('quarter')}
                >
                  Quarter
                </button>
                <button
                  className={`${styles.periodButton} ${period === 'year' ? styles.activePeriod : ''}`}
                  onClick={() => setPeriod('year')}
                >
                  Year
                </button>
              </div>
            </div>

            {performance && (
              <div className={styles.performanceContent}>
                <div className={styles.performanceSummary}>
                  <div className={styles.performanceCard}>
                    <span className={styles.performanceCardLabel}>Total Clicks</span>
                    <span className={styles.performanceCardValue}>
                      {performance.summary?.totalClicks || 0}
                    </span>
                  </div>
                  <div className={styles.performanceCard}>
                    <span className={styles.performanceCardLabel}>Conversions</span>
                    <span className={styles.performanceCardValue}>
                      {performance.summary?.totalConversions || 0}
                    </span>
                  </div>
                  <div className={styles.performanceCard}>
                    <span className={styles.performanceCardLabel}>Conversion Rate</span>
                    <span className={styles.performanceCardValue}>
                      {performance.summary?.conversionRate?.toFixed(1) || '0'}%
                    </span>
                  </div>
                  <div className={styles.performanceCard}>
                    <span className={styles.performanceCardLabel}>Total Revenue</span>
                    <span className={styles.performanceCardValue}>
                      {formatCurrency(performance.summary?.totalRevenue || 0)}
                    </span>
                  </div>
                  <div className={styles.performanceCard}>
                    <span className={styles.performanceCardLabel}>Your Commission</span>
                    <span className={styles.performanceCardValue}>
                      {formatCurrency(performance.summary?.totalCommission || 0)}
                    </span>
                  </div>
                  <div className={styles.performanceCard}>
                    <span className={styles.performanceCardLabel}>Earnings Per Click</span>
                    <span className={styles.performanceCardValue}>
                      {formatCurrency(performance.summary?.earningsPerClick || 0)}
                    </span>
                  </div>
                </div>

                {performance.dailyBreakdown?.length > 0 && (
                  <div className={styles.dailyBreakdown}>
                    <h3 className={styles.breakdownTitle}>Daily Breakdown</h3>
                    <div className={styles.breakdownList}>
                      {performance.dailyBreakdown.map((day) => (
                        <div key={day.date} className={styles.breakdownItem}>
                          <span className={styles.breakdownDate}>{day.date}</span>
                          <span className={styles.breakdownSales}>{day.sales} sales</span>
                          <span className={styles.breakdownCommission}>
                            {formatCurrency(day.commission)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {performance.topProducts?.length > 0 && (
                  <div className={styles.topProducts}>
                    <h3 className={styles.breakdownTitle}>Top Performing Products</h3>
                    <div className={styles.productsList}>
                      {performance.topProducts.map((product) => (
                        <div key={product.id} className={styles.productItem}>
                          <span className={styles.productName}>{product.title}</span>
                          <span className={styles.productSales}>{product.sales} sales</span>
                          <span className={styles.productCommission}>
                            {formatCurrency(product.commission)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Payouts Tab */}
        {activeTab === 'payouts' && (
          <div className={styles.payouts}>
            <h2 className={styles.tabTitle}>Payout Settings</h2>
            
            <div className={styles.payoutsGrid}>
              <div className={styles.bankDetailsCard}>
                <h3 className={styles.cardTitle}>Bank Details</h3>
                
                {!hasBankDetails ? (
                  <div className={styles.bankForm}>
                    <div className={styles.formGroup}>
                      <label>Account Number</label>
                      <input
                        type="text"
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                        placeholder="10-digit account number"
                        maxLength="10"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Account Name</label>
                      <input
                        type="text"
                        value={bankDetails.accountName}
                        onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                        placeholder="Full account name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Bank Code</label>
                      <input
                        type="text"
                        value={bankDetails.bankCode}
                        onChange={(e) => setBankDetails({...bankDetails, bankCode: e.target.value})}
                        placeholder="e.g., 058 for GTBank"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Bank Name</label>
                      <input
                        type="text"
                        value={bankDetails.bankName}
                        onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                        placeholder="e.g., GTBank"
                      />
                    </div>
                    <button
                      onClick={handleUpdateBankDetails}
                      className={styles.saveButton}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Bank Details'}
                    </button>
                  </div>
                ) : (
                  <div className={styles.bankDetails}>
                    <div className={styles.bankDetail}>
                      <span className={styles.bankDetailLabel}>Account Number:</span>
                      <span className={styles.bankDetailValue}>{bankDetails.accountNumber}</span>
                    </div>
                    <div className={styles.bankDetail}>
                      <span className={styles.bankDetailLabel}>Account Name:</span>
                      <span className={styles.bankDetailValue}>{bankDetails.accountName}</span>
                    </div>
                    <div className={styles.bankDetail}>
                      <span className={styles.bankDetailLabel}>Bank:</span>
                      <span className={styles.bankDetailValue}>{bankDetails.bankName}</span>
                    </div>
                    <button
                      onClick={() => setHasBankDetails(false)}
                      className={styles.editButton}
                    >
                      Edit Details
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.payoutCard}>
                <h3 className={styles.cardTitle}>Request Payout</h3>
                
                <div className={styles.earningsSummary}>
                  <div className={styles.earningRow}>
                    <span>Pending Earnings:</span>
                    <span className={styles.earningAmount}>
                      {displayEarnings.pending?.formatted || '₦0'}
                    </span>
                  </div>
                  <div className={styles.earningRow}>
                    <span>Minimum Payout:</span>
                    <span className={styles.earningAmount}>
                      {dashboardData?.payout?.formattedThreshold || '₦5,000'}
                    </span>
                  </div>
                </div>

                {hasBankDetails ? (
                  <div className={styles.payoutForm}>
                    <div className={styles.formGroup}>
                      <label>Amount to Withdraw (₦)</label>
                      <input
                        type="number"
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        placeholder="Enter amount"
                        min={dashboardData?.payout?.threshold ? dashboardData.payout.threshold / 100 : 50}
                        max={displayEarnings.pending?.amount ? displayEarnings.pending.amount / 100 : 0}
                      />
                    </div>
                    <button
                      onClick={handleRequestPayout}
                      className={styles.payoutButton}
                      disabled={isLoading || !payoutAmount || parseFloat(payoutAmount) < (dashboardData?.payout?.threshold ? dashboardData.payout.threshold / 100 : 50)}
                    >
                      {isLoading ? 'Processing...' : 'Request Payout'}
                    </button>
                    <p className={styles.payoutNote}>
                      Payouts are processed within 7 business days
                    </p>
                  </div>
                ) : (
                  <div className={styles.bankRequired}>
                    <p>Please add your bank details first to request payouts.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCampaignModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Create New Campaign</h3>
              <button
                onClick={() => setShowCampaignModal(false)}
                className={styles.modalClose}
              >
                <Icon name="X" />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Campaign Name *</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  placeholder="e.g., Twitter Promo, WhatsApp Status"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description (Optional)</label>
                <textarea
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                  placeholder="Describe your campaign"
                  rows="3"
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Medium (Optional)</label>
                  <input
                    type="text"
                    value={newCampaign.medium}
                    onChange={(e) => setNewCampaign({...newCampaign, medium: e.target.value})}
                    placeholder="e.g., social, email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Source (Optional)</label>
                  <input
                    type="text"
                    value={newCampaign.source}
                    onChange={(e) => setNewCampaign({...newCampaign, source: e.target.value})}
                    placeholder="e.g., twitter, facebook"
                  />
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                onClick={() => setShowCampaignModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                className={styles.createButton}
                disabled={isLoading || !newCampaign.name}
              >
                {isLoading ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateDashboard;