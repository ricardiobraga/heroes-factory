import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    fontSizeHeading1: 32,
    fontSizeHeading2: 28,
    fontSizeHeading3: 24,
    fontSizeHeading4: 18,
    fontSizeHeading5: 16,
    colorPrimary: '#0e2fbb',
  },
  components: {
    Input: {
      borderRadius: 999,
      paddingBlock: 8,
      paddingInline: 16,
      colorTextPlaceholder: '#ccc',
      colorIcon: 'primary',
      colorText: 'var(--ant-color-primary)',
    },

    Typography: {


    }
  },
};

export default theme;