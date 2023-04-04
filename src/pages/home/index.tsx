import React, { useEffect, useState } from 'react';
import { Button, message, Popover, QRCode, Spin, Tooltip } from 'antd';
import '../../components/Layout/index.less';
import copy from 'copy-to-clipboard';
import { applyDownload, getAgentDomain, getAgentDownload, getHomeData } from '@/api/home';
import styles from './style.module.scss';
import { USER_INFO } from '@/constant';
import useRequest from '@/hooks/useRequest';
import { CloudDownloadOutlined, CopyOutlined } from '@ant-design/icons';
import recommend_icon from './img/recommend.svg';
import { useSelector } from '@/store';

const _cardData: any[] = [
  {
    id: 1,
    key: 'agent_comm_amount',
    title: '今日佣金',
    value: 0,
  },
  {
    id: 2,
    key: 'register_user_count',
    title: '今日新增',
    value: 0,
  },
  {
    id: 3,
    key: 'recharge_amount',
    title: '今日存款',
    value: 0,
  },
  {
    id: 4,
    key: 'diamond_buy_amount',
    title: '今日钻石兑换',
    value: 0,
  },
  {
    id: 5,
    key: 'valid_amount',
    title: '今日有效投注',
    value: 0,
  },
  {
    id: 6,
    key: 'profit_amount',
    title: '今日负盈利',
    value: 0,
  },
  {
    id: 7,
    key: 'agent_comm_amount',
    title: '累计佣金',
    value: 0,
  },
  {
    id: 8,
    key: 'register_user_count',
    title: '累计新增',
    value: 0,
  },
  {
    id: 9,
    key: 'recharge_amount',
    title: '累计存款',
    value: 0,
  },
  {
    id: 10,
    key: 'diamond_buy_amount',
    title: '累计钻石兑换',
    value: 0,
  },
  {
    id: 11,
    key: 'valid_amount',
    title: '累计有效投注',
    value: 0,
  },
  {
    id: 12,
    key: 'profit_amount',
    title: '总负盈亏',
    value: 0,
  },
];

const Home: React.FC = () => {
  const [cardData, setCardData] = useState(_cardData);
  const [domainData, setDomainData] = useState([]);
  const [downloadData, setDownloadData] = useState<any>({});
  // const [loading, setLoading] = useState(false);
  const { loading, run } = useRequest();
  const user = useSelector((state: any) => state.user);

  const downloadQRCode = () => {
    const canvas = document.getElementById('qrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = '安卓渠道包二维码.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const getAgentDomainData = async () => {
    const res = await run(getAgentDomain());
    if (Array.isArray(res.data)) {
      setDomainData(res.data);
    }
  };

  const getAgentDownloadData = async () => {
    const res = await run(getAgentDownload());
    if (res.data) {
      setDownloadData(res.data);
    }
  };

  const handleApplyDownload = async () => {
    const res = await run(applyDownload());

    if (res.code === 200) {
      getAgentDownloadData();
      message.success('申请成功！');
    }
  };

  useEffect(() => {
    getAgentDomainData();
    getAgentDownloadData();
    let user: any = JSON.parse(localStorage.getItem(USER_INFO) || '{}');
    // setLoading(true);

    getHomeData({ pid: user.aid })
      .then((res) => {
        if (res && res.data && res.data.today && res.data.total) {
          const _data = cardData.map((ele) => {
            if (ele.id <= 6) {
              return {
                ...ele,
                value: res.data.today[ele.key],
              };
            } else {
              return {
                ...ele,
                value: res.data.total[ele.key],
              };
            }
          });
          setCardData(_data);
        }
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  const getDomainType = (type) => {
    const typeMap = {
      1: '色版',
      2: '素版',
      3: '直播版',
      4: '微信防封版',
    };
    return typeMap[type] || '';
  };

  const handleCopy = (string: string) => {
    try {
      copy(string);
      message.success('已复制');
    } catch (e) {
      message.error(Object.toString.call(e));
    }
  };

  const convertLink = (link: string) => {
    if (link.includes('http')) {
      //在斜杠后添加邀请码
      const index = link.indexOf('//');
      return link.slice(0, index + 2) + `${user.code}.` + link.slice(index + 2);
    }
    return `${user.code}.${link}`;
  };

  return (
    <div className={styles.homeWarp}>
      <Spin spinning={loading}>
        <div className={styles.homeTitle}>数据概览</div>
        <div className={styles.cardWarp}>
          {cardData.map((ele) => {
            return (
              <div className={styles.cardItem} key={ele.id}>
                <div className={styles.itemTitle}>{ele.title}</div>
                <div className={styles.itemNum}>{ele.value}</div>
              </div>
            );
          })}
        </div>

        <div className={styles.domainContainer}>
          <div className={`${styles.homeTitle}`}>推广链接</div>
          <div className={styles.domainCardWarp}>
            {domainData.map((ele: any) => {
              return (
                <div className={styles.linkBox} key={ele.id}>
                  <div className={styles.linkContent}>
                    {ele.is_recom === 0 && (
                      <div className={styles.recommendIcon}>
                        <img src={recommend_icon} alt='' />
                      </div>
                    )}

                    <div className={styles.itemTitle}>{getDomainType(ele.type)}</div>
                    <div className={styles.itemNum}>
                      <Tooltip title={convertLink(ele?.domain_name)}>
                        <span>{convertLink(ele?.domain_name)}</span>
                      </Tooltip>
                    </div>
                  </div>
                  <div className={styles.linkCopy} onClick={handleCopy.bind(null, convertLink(ele?.domain_name))}>
                    <CopyOutlined style={{ fontSize: '18px', fontWeight: '600' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.downloadContainer}>
          <div className={styles.channelHeader}>
            <div className={styles.recommendIcon}>
              <img src={recommend_icon} alt='' />
            </div>

            <span className={styles.title}>渠道包</span>
            <Button
              onClick={handleApplyDownload}
              type='primary'
              danger
              loading={loading}
              disabled={downloadData.channel_status === 1}>
              {downloadData.channel_status === 1 ? '处理中' : '申请渠道包'}
            </Button>
          </div>
          <div className={styles.downloadWarp}>
            <div className={styles.downloadLinkBox}>
              <div className={styles.linkContent}>
                <div className={styles.recommendIcon}>
                  <img src={recommend_icon} alt='' />
                </div>
                <div className={styles.itemTitle}>安卓渠道包</div>
                <div className={styles.itemNum}>
                  <Tooltip title={downloadData?.download_url}>
                    <span>{downloadData?.download_url}</span>
                  </Tooltip>
                </div>
              </div>
              <div className={styles.linkCopy}>
                <CopyOutlined
                  style={{ fontSize: '22px', fontWeight: '600' }}
                  onClick={handleCopy.bind(null, downloadData?.download_url)}
                />
                <span className={styles.linkDesc}>复制链接</span>
              </div>
              <Popover
                content={
                  <div id='qrcode'>
                    <QRCode value={downloadData?.download_url} style={{ marginBottom: 16 }} />
                  </div>
                }
                title='下载二维码'>
                <div className={styles.linkCopy} onClick={downloadQRCode}>
                  <CloudDownloadOutlined style={{ fontSize: '22px', fontWeight: '600' }} />
                  <span className={styles.linkDesc}>下载二维码</span>
                </div>
              </Popover>
            </div>
            <div className={styles.tips}>注:安装渠道包的客户将百分之百统计到您的下级,目前仅支持安卓渠道包IOS暂无</div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Home;
