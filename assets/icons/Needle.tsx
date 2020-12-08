import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const Needle: React.FC<Props> = ({ width = 16, height = 16, color = '#888B8C' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M2.62693 10.9691L2.98048 10.6156L2.62693 10.9691ZM2.62693 10.5449L2.98048 10.8984L2.62693 10.5449ZM5.03109 13.3733L4.67754 13.7268L5.03109 13.3733ZM12.6083 5.79608L12.9618 5.44253L12.6083 5.79608ZM10.2041 3.39192L9.85057 3.74547V3.74547L10.2041 3.39192ZM9.77986 3.39192L9.42631 3.03837L9.77986 3.39192ZM2.97487 15.8517C3.17014 16.047 3.48672 16.047 3.68198 15.8517C3.87724 15.6564 3.87724 15.3399 3.68198 15.1446L2.97487 15.8517ZM0.853553 12.3162C0.658291 12.1209 0.341709 12.1209 0.146447 12.3162C-0.0488155 12.5114 -0.0488155 12.828 0.146447 13.0233L0.853553 12.3162ZM4.78932 10.504C4.98458 10.6992 5.30116 10.6992 5.49642 10.504C5.69168 10.3087 5.69168 9.99214 5.49642 9.79688L4.78932 10.504ZM4.43532 8.73578C4.24006 8.54051 3.92347 8.54051 3.72821 8.73577C3.53295 8.93104 3.53295 9.24762 3.72821 9.44288L4.43532 8.73578ZM6.20353 9.08977C6.39879 9.28503 6.71537 9.28503 6.91064 9.08977C7.1059 8.89451 7.1059 8.57793 6.91064 8.38267L6.20353 9.08977ZM5.84953 7.32156C5.65427 7.1263 5.33769 7.1263 5.14243 7.32156C4.94716 7.51682 4.94716 7.83341 5.14243 8.02867L5.84953 7.32156ZM7.61774 7.67556C7.813 7.87082 8.12959 7.87082 8.32485 7.67556C8.52011 7.4803 8.52011 7.16371 8.32485 6.96845L7.61774 7.67556ZM7.26375 5.90735C7.06848 5.71209 6.7519 5.71209 6.55664 5.90735C6.36138 6.10261 6.36138 6.41919 6.55664 6.61446L7.26375 5.90735ZM9.03196 6.26134C9.22722 6.45661 9.5438 6.45661 9.73906 6.26134C9.93433 6.06608 9.93433 5.7495 9.73906 5.55424L9.03196 6.26134ZM8.67796 4.49313C8.4827 4.29787 8.16612 4.29787 7.97085 4.49313C7.77559 4.6884 7.77559 5.00498 7.97085 5.20024L8.67796 4.49313ZM12.4114 2.87692C12.2162 3.07219 12.2162 3.38877 12.4114 3.58403C12.6067 3.77929 12.9233 3.77929 13.1186 3.58402L12.4114 2.87692ZM15.763 0.939485C15.9583 0.74422 15.9583 0.427638 15.763 0.232379C15.5677 0.0371196 15.2511 0.0371244 15.0559 0.23239L15.763 0.939485ZM1.77717 13.5114C1.5819 13.7066 1.5819 14.0232 1.77717 14.2185C1.97243 14.4137 2.28901 14.4137 2.48427 14.2185L1.77717 13.5114ZM4.09664 12.6061C4.29191 12.4108 4.29191 12.0942 4.09664 11.899C3.90138 11.7037 3.5848 11.7037 3.38954 11.899L4.09664 12.6061ZM12.1696 2.84067L11.816 3.19422L11.816 3.19422L12.1696 2.84067ZM13.1595 3.83062L13.5131 3.47706L13.5131 3.47706L13.1595 3.83062ZM13.1595 4.25488L12.806 3.90133L13.1595 4.25488ZM11.7598 4.94752C11.5645 5.14278 11.5645 5.45936 11.7598 5.65463C11.9551 5.84989 12.2716 5.84989 12.4669 5.65463L11.7598 4.94752ZM10.3456 3.53331C10.1503 3.72857 10.1503 4.04515 10.3456 4.24041C10.5408 4.43568 10.8574 4.43568 11.0527 4.24041L10.3456 3.53331ZM11.7453 2.84067L11.3918 2.48711V2.48711L11.7453 2.84067ZM15.0834 9.24609H15.5834H15.0834ZM13.7955 7.7798L13.4233 7.44586L13.7955 7.7798ZM14.2078 7.7798L13.8357 8.11374L14.2078 7.7798ZM9.85057 3.74547L12.2547 6.14964L12.9618 5.44253L10.5577 3.03837L9.85057 3.74547ZM12.2547 5.8668L5.1018 13.0197L5.80891 13.7268L12.9618 6.5739L12.2547 5.8668ZM5.38464 13.0197L2.98048 10.6156L2.27337 11.3227L4.67754 13.7268L5.38464 13.0197ZM2.98048 10.8984L10.1334 3.74547L9.42631 3.03837L2.27337 10.1913L2.98048 10.8984ZM2.98048 10.6156C3.05858 10.6937 3.05858 10.8203 2.98048 10.8984L2.27337 10.1913C1.96095 10.5037 1.96095 11.0103 2.27337 11.3227L2.98048 10.6156ZM5.1018 13.0197C5.1799 12.9416 5.30654 12.9416 5.38464 13.0197L4.67754 13.7268C4.98995 14.0393 5.49649 14.0393 5.80891 13.7268L5.1018 13.0197ZM12.2547 6.14964C12.1766 6.07153 12.1766 5.9449 12.2547 5.8668L12.9618 6.5739C13.2743 6.26148 13.2743 5.75495 12.9618 5.44253L12.2547 6.14964ZM10.5577 3.03837C10.2453 2.72595 9.73873 2.72595 9.42631 3.03837L10.1334 3.74547C10.0553 3.82358 9.92868 3.82358 9.85057 3.74547L10.5577 3.03837ZM3.68198 15.1446L0.853553 12.3162L0.146447 13.0233L2.97487 15.8517L3.68198 15.1446ZM5.49642 9.79688L4.43532 8.73578L3.72821 9.44288L4.78932 10.504L5.49642 9.79688ZM6.91064 8.38267L5.84953 7.32156L5.14243 8.02867L6.20353 9.08977L6.91064 8.38267ZM8.32485 6.96845L7.26375 5.90735L6.55664 6.61446L7.61774 7.67556L8.32485 6.96845ZM9.73906 5.55424L8.67796 4.49313L7.97085 5.20024L9.03196 6.26134L9.73906 5.55424ZM13.1186 3.58402L15.763 0.939485L15.0559 0.23239L12.4114 2.87692L13.1186 3.58402ZM2.48427 14.2185L4.09664 12.6061L3.38954 11.899L1.77717 13.5114L2.48427 14.2185ZM11.816 3.19422L12.806 4.18417L13.5131 3.47706L12.5231 2.48711L11.816 3.19422ZM12.806 3.90133L11.7598 4.94752L12.4669 5.65463L13.5131 4.60843L12.806 3.90133ZM11.0527 4.24041L12.0989 3.19422L11.3918 2.48711L10.3456 3.53331L11.0527 4.24041ZM12.806 4.18417C12.7279 4.10606 12.7279 3.97943 12.806 3.90133L13.5131 4.60843C13.8255 4.29602 13.8255 3.78948 13.5131 3.47706L12.806 4.18417ZM12.5232 2.48711C12.2107 2.17469 11.7042 2.17469 11.3918 2.48711L12.0989 3.19422C12.0208 3.27232 11.8941 3.27232 11.816 3.19422L12.5232 2.48711ZM14.5834 9.24609C14.5834 9.40036 14.5221 9.54832 14.413 9.65741L15.1201 10.3645C15.4167 10.0679 15.5834 9.66559 15.5834 9.24609H14.5834ZM14.413 9.65741C14.3039 9.7665 14.1559 9.82779 14.0017 9.82779V10.8278C14.4211 10.8278 14.8235 10.6611 15.1201 10.3645L14.413 9.65741ZM14.0017 9.82779C13.8474 9.82779 13.6994 9.7665 13.5903 9.65741L12.8832 10.3645C13.1798 10.6611 13.5822 10.8278 14.0017 10.8278V9.82779ZM13.5903 9.65741C13.4812 9.54832 13.42 9.40037 13.42 9.24609H12.42C12.42 9.66558 12.5866 10.0679 12.8832 10.3645L13.5903 9.65741ZM13.42 9.24609C13.42 9.2462 13.42 9.24254 13.4211 9.23462C13.4223 9.22672 13.4244 9.21564 13.4282 9.20118C13.436 9.17166 13.4493 9.13349 13.47 9.08658C13.512 8.99154 13.5755 8.88065 13.6558 8.76034C13.8165 8.51973 14.0176 8.28088 14.1676 8.11374L13.4233 7.44586C13.2594 7.62851 13.0228 7.90756 12.8242 8.20503C12.7249 8.35375 12.6284 8.51695 12.5552 8.68255C12.4848 8.842 12.42 9.03911 12.42 9.24609H13.42ZM13.8357 8.11374C13.9857 8.28088 14.1868 8.51973 14.3475 8.76034C14.4278 8.88066 14.4913 8.99154 14.5333 9.08658C14.554 9.1335 14.5673 9.17166 14.5751 9.20118C14.5789 9.21564 14.581 9.22672 14.5822 9.23462C14.5833 9.24254 14.5834 9.2462 14.5834 9.24609H15.5834C15.5834 9.03911 15.5185 8.842 15.4481 8.68255C15.3749 8.51695 15.2784 8.35375 15.1791 8.20503C14.9805 7.90756 14.7439 7.62851 14.58 7.44586L13.8357 8.11374ZM14.1676 8.11374C14.0801 8.21121 13.9232 8.21121 13.8357 8.11374L14.58 7.44586C14.27 7.1005 13.7333 7.1005 13.4233 7.44586L14.1676 8.11374Z"
        fill={color}
      />
    </Svg>
  );
};

export default Needle;
