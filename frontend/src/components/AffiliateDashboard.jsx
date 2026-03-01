// src/components/AffiliateDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from './shared/Icons';
import styles from './AffiliateDashboard.module.css';
import AffiliateService from '../services/AffiliateService';
import toast from 'react-hot-toast';

const AffiliateDashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
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
  const [copiedLink, setCopiedLink] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from URL
    const urlToken = searchParams.get('token');
    
    if (!urlToken) {
      toast.error('No access token provided');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      return;
    }
    
    setToken(urlToken);
    
    // IMPORTANT: Set the token in the service BEFORE loading data
    AffiliateService.setAuthToken(urlToken);
    
    loadDashboardData();
  }, [searchParams]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // Load all data in parallel with the token already set
      const [dashboardRes, earningsRes, referralsRes, campaignsRes, bankRes] = await Promise.all([
        AffiliateService.getDashboard(),
        AffiliateService.getEarnings(),
        AffiliateService.getReferrals(1, 20),
        AffiliateService.getCampaigns(),
        AffiliateService.getBankDetails()
      ]);

      console.log('Dashboard response:', dashboardRes);
      console.log('Earnings response:', earningsRes);
      console.log('Referrals response:', referralsRes);

      if (dashboardRes.success) setDashboardData(dashboardRes.data);
      if (earningsRes.success) setEarnings(earningsRes.data);
      if (referralsRes.success) setReferrals(referralsRes.data.referrals || []);
      if (campaignsRes.success) setCampaigns(campaignsRes.data);
      if (bankRes.success) {
        setBankDetails(bankRes.data.bankDetails || {});
        setHasBankDetails(bankRes.data.hasBankDetails || false);
      }
      
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
      
      // If token is invalid, redirect to home
      if (error.response?.status === 401) {
        toast.error('Invalid or expired access link');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
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
    setIsLoading(false);
  };

  const handleUpdateBankDetails = async () => {
    if (!bankDetails.accountNumber || !bankDetails.accountName || !bankDetails.bankCode || !bankDetails.bankName) {
      toast.error('All bank details are required');
      return;
    }

    setIsLoading(true);
    const result = await AffiliateService.updateBankDetails(bankDetails);
    if (result.success) {
      toast.success('Bank details updated successfully!');
      setHasBankDetails(true);
    } else {
      toast.error(result.error || 'Failed to update bank details');
    }
    setIsLoading(false);
  };

  const handleRequestPayout = async () => {
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(payoutAmount) * 100;

    setIsLoading(true);
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
    setIsLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(text);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '₦0';
    return amount;
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

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your affiliate dashboard...</p>
      </div>
    );
  }

  // Rest of your JSX remains exactly the same...
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
                {dashboardData?.earnings?.formattedTotal || '₦0'}
              </span>
            </div>
            <div className={styles.headerStat}>
              <span className={styles.headerStatLabel}>Pending</span>
              <span className={styles.headerStatValue}>
                {dashboardData?.earnings?.formattedPending || '₦0'}
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
                  <span className={styles.statValue}>{dashboardData.earnings?.formattedTotal}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⏳</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Pending</span>
                  <span className={styles.statValue}>{dashboardData.earnings?.formattedPending}</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Paid</span>
                  <span className={styles.statValue}>{dashboardData.earnings?.formattedPaid}</span>
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
          </div>
        )}

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
                      {dashboardData?.earnings?.formattedPending || '₦0'}
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
                        max={earnings?.pending?.amount ? earnings.pending.amount / 100 : 0}
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