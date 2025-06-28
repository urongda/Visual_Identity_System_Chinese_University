let data = [];
let stats = { total: 0, withVis: 0, withoutVis: 0, withWebsite: 0, withoutWebsite: 0 }; // 缓存统计数据

// 工具函数 - 避免重复创建
function getCategory(slug) {
  return String(slug).slice(0, 2);
}

function getCategoryPriority(category) {
  // 41、42类别优先级最高
  if (category === '41' || category === '42') return 0;
  // 其他类别按升序排列
  return 1;
}

function linkOrDisabled({ href, text, isMain }) {
  const base = "inline-block px-4 py-2 rounded-md text-sm font-medium border transition ";
  if (href) {
    return {
      a: {
        href,
        target: "_blank",
        className: base + (isMain ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"),
        text
      }
    };
  } else {
    return {
      span: {
        className: base + "text-gray-300 border-gray-100 cursor-not-allowed select-none",
        text
      }
    };
  }
}

// 排序函数
function sortSchools(schools, sortBy) {
  return schools.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title, 'zh-Hans-CN');
    } else {
      // 先按类别码（前两位）升序，再按slug升序
      const aCat = getCategory(a.slug);
      const bCat = getCategory(b.slug);
      
      // 先按类别优先级排序
      const aPriority = getCategoryPriority(aCat);
      const bPriority = getCategoryPriority(bCat);
      if (aPriority !== bPriority) return aPriority - bPriority;
      
      // 同优先级内按类别码升序
      if (aCat !== bCat) return aCat.localeCompare(bCat);
      
      // 最后按slug升序
      return a.slug - b.slug;
    }
  });
}

// 过滤函数
function filterSchools(schools, filter, visFilter, websiteFilter) {
  let filtered = schools;
  
  // 文本搜索过滤
  if (filter.trim()) {
    const filterLower = filter.toLowerCase();
    filtered = filtered.filter(school => school.title.toLowerCase().includes(filterLower));
  }
  
  // VIS过滤
  if (visFilter === 'with') {
    filtered = filtered.filter(school => !!school.vis);
  } else if (visFilter === 'without') {
    filtered = filtered.filter(school => !school.vis);
  }
  
  // 官网过滤
  if (websiteFilter === 'with') {
    filtered = filtered.filter(school => !!school.website);
  } else if (websiteFilter === 'without') {
    filtered = filtered.filter(school => !school.website);
  }
  
  return filtered;
}

// 计算统计数据
function calculateStats(schools) {
  stats.total = schools.length;
  stats.withVis = schools.filter(s => !!s.vis).length;
  stats.withoutVis = stats.total - stats.withVis;
  stats.withWebsite = schools.filter(s => !!s.website).length;
  stats.withoutWebsite = stats.total - stats.withWebsite;
}

// Info panel at the very top
const infoPanel = document.createElement('div');
infoPanel.className = "w-full flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 bg-gray-50 border border-gray-200 rounded-b-xl px-4 py-2 text-sm text-gray-700 mb-4 mt-4";
infoPanel.innerHTML = `
<span class="flex items-center gap-1 mt-1 sm:mt-0">
  <a href="https://github.com/urongda/Visual_Identity_System_Chinese_University" target="_blank" class="flex items-center text-gray-700 hover:text-blue-700 underline">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" class="inline align-text-bottom mr-1"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.289-1.553 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg>
    <span class="inline">GitHub</span>
  </a>
</span>
<span class="hidden sm:inline">&nbsp;|&nbsp;</span>
  <span>更多信息或下载 SVG，请访问 
    <a href="https://www.urongda.com" target="_blank" class="text-blue-600 underline hover:text-blue-800">中国大学矢量校徽大全</a>
  </span>
`;
document.body.prepend(infoPanel);

// Render the main heading and info text above the app card
const heading = document.createElement('h1');
heading.className = "text-4xl font-extrabold text-center text-gray-900 mb-2 mt-12";
heading.textContent = "中国高校视觉形象识别系统(VIS)导航";
document.body.insertBefore(heading, infoPanel.nextSibling);

// Info text section (secondary text under site header)
const infoText = document.createElement('div');
infoText.className = "mb-8 text-center text-sm text-gray-500";
document.body.insertBefore(infoText, heading.nextSibling);

function updateInfoText() {
  infoText.innerHTML = `
    <div class="w-full max-w-2xl mx-auto text-sm text-gray-800 space-y-4 leading-relaxed">
      
      <!-- 总数 -->
      <div class="text-base font-semibold text-center text-gray-900">
        共 <span class="text-blue-700 bg-blue-50 rounded px-2 py-0.5 font-bold">${stats.total}</span> 所高校
      </div>
      <!-- 官网信息分组 -->
      <div class="text-center">
        <div class="font-medium text-gray-700 mb-2">官网信息：</div>
        <div class="flex flex-wrap justify-center gap-6">
          <div class="flex items-center gap-1">
            <span class="text-green-600">✅</span>
            <span>有官网：</span>
            <span class="font-bold text-green-700 bg-green-50 rounded px-2 py-0.5">${stats.withWebsite}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-red-600">❌</span>
            <span>无官网：</span>
            <span class="font-bold text-red-700 bg-red-50 rounded px-2 py-0.5">${stats.withoutWebsite}</span>
          </div>
        </div>
      </div>
      <!-- VIS 资源分组 -->
      <div class="text-center">
        <div class="font-medium text-gray-700 mb-2">VIS 资源：</div>
        <div class="flex flex-wrap justify-center gap-6">
          <div class="flex items-center gap-1">
            <span class="text-green-600">✅</span>
            <span>有 VIS：</span>
            <span class="font-bold text-green-700 bg-green-50 rounded px-2 py-0.5">${stats.withVis}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-red-600">❌</span>
            <span>无 VIS：</span>
            <span class="font-bold text-red-700 bg-red-50 rounded px-2 py-0.5">${stats.withoutVis}</span>
          </div>
        </div>
      </div>

   

    </div>
  `;
}

const app = new Juris({
  states: {
    filter: '',
    loaded: false,
    sortBy: 'slug', // 'slug' or 'title'
    visFilter: 'all', // 'all', 'with', 'without'
    websiteFilter: 'all' // 'all', 'with', 'without'
  },
  layout: {
    div: {
      className: "bg-white rounded-xl shadow border border-gray-200 max-w-4xl mx-auto mt-10 min-h-[600px] p-10 relative",
      children: [
        // Sticky header
        {
          div: {
            className: "sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 px-8 pt-8 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
            children: [
              // Search and sort controls
              {
                div: {
                  className: "flex flex-col gap-3 w-full",
                  children: [
                    {
                      div: {
                        className: "flex flex-col sm:flex-row sm:items-center gap-3 w-full",
                        children: [
                          {
                            input: {
                              className: "flex-1 px-4 py-3 border border-gray-200 rounded-md bg-gray-50 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition",
                              type: "text",
                              placeholder: "搜索学校名称...",
                              oninput: e => app.setState('filter', e.target.value),
                              disabled: () => !app.getState('loaded')
                            }
                          },
                          {
                            button: {
                              className: () =>
                                "flex-none px-4 py-3 rounded-md border text-base font-medium transition w-full sm:w-auto " +
                                (app.getState('sortBy') === 'title'
                                  ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
                                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"),
                              text: "按名称排序",
                              onclick: () => app.setState('sortBy', app.getState('sortBy') === 'title' ? 'slug' : 'title'),
                              title: "切换排序方式"
                            }
                          }
                        ]
                      }
                    },
                    // Filter controls row
                    {
                      div: {
                        className: "flex flex-col gap-4 w-full items-end",
                        children: [
                          // 官网过滤组
                          {
                            div: {
                              className: "flex flex-row items-center gap-4",
                              children: [
                                {
                                  div: {
                                    className: "text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap",
                                    text: "官网"
                                  }
                                },
                                {
                                  div: {
                                    className: "flex gap-3",
                                    children: [
                                      {
                                        label: {
                                          className: "flex items-center gap-2 text-sm cursor-pointer",
                                          children: [
                                            {
                                              input: {
                                                type: "radio",
                                                name: "website-filter",
                                                value: "all",
                                                checked: () => app.getState('websiteFilter') === 'all',
                                                onchange: e => app.setState('websiteFilter', e.target.value),
                                                className: "w-3 h-3 text-gray-600 border-gray-300 focus:ring-gray-500"
                                              }
                                            },
                                            { span: { text: "全部" } }
                                          ]
                                        }
                                      },
                                      {
                                        label: {
                                          className: "flex items-center gap-2 text-sm cursor-pointer",
                                          children: [
                                            {
                                              input: {
                                                type: "radio",
                                                name: "website-filter",
                                                value: "with",
                                                checked: () => app.getState('websiteFilter') === 'with',
                                                onchange: e => app.setState('websiteFilter', e.target.value),
                                                className: "w-3 h-3 text-gray-600 border-gray-300 focus:ring-gray-500"
                                              }
                                            },
                                            { span: { text: "有" } }
                                          ]
                                        }
                                      },
                                      {
                                        label: {
                                          className: "flex items-center gap-2 text-sm cursor-pointer",
                                          children: [
                                            {
                                              input: {
                                                type: "radio",
                                                name: "website-filter",
                                                value: "without",
                                                checked: () => app.getState('websiteFilter') === 'without',
                                                onchange: e => app.setState('websiteFilter', e.target.value),
                                                className: "w-3 h-3 text-gray-600 border-gray-300 focus:ring-gray-500"
                                              }
                                            },
                                            { span: { text: "无" } }
                                          ]
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            }
                          },
                          // VIS过滤组
                          {
                            div: {
                              className: "flex flex-row items-center gap-4",
                              children: [
                                {
                                  div: {
                                    className: "text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap",
                                    text: "VIS"
                                  }
                                },
                                {
                                  div: {
                                    className: "flex gap-3",
                                    children: [
                                      {
                                        label: {
                                          className: "flex items-center gap-2 text-sm cursor-pointer",
                                          children: [
                                            {
                                              input: {
                                                type: "radio",
                                                name: "vis-filter",
                                                value: "all",
                                                checked: () => app.getState('visFilter') === 'all',
                                                onchange: e => app.setState('visFilter', e.target.value),
                                                className: "w-3 h-3 text-gray-600 border-gray-300 focus:ring-gray-500"
                                              }
                                            },
                                            { span: { text: "全部" } }
                                          ]
                                        }
                                      },
                                      {
                                        label: {
                                          className: "flex items-center gap-2 text-sm cursor-pointer",
                                          children: [
                                            {
                                              input: {
                                                type: "radio",
                                                name: "vis-filter",
                                                value: "with",
                                                checked: () => app.getState('visFilter') === 'with',
                                                onchange: e => app.setState('visFilter', e.target.value),
                                                className: "w-3 h-3 text-gray-600 border-gray-300 focus:ring-gray-500"
                                              }
                                            },
                                            { span: { text: "有" } }
                                          ]
                                        }
                                      },
                                      {
                                        label: {
                                          className: "flex items-center gap-2 text-sm cursor-pointer",
                                          children: [
                                            {
                                              input: {
                                                type: "radio",
                                                name: "vis-filter",
                                                value: "without",
                                                checked: () => app.getState('visFilter') === 'without',
                                                onchange: e => app.setState('visFilter', e.target.value),
                                                className: "w-3 h-3 text-gray-600 border-gray-300 focus:ring-gray-500"
                                              }
                                            },
                                            { span: { text: "无" } }
                                          ]
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        // List (no header)
        {
          div: {
            className: "divide-y divide-gray-100 min-h-[300px] px-2 sm:px-0",
            children: () => {
              if (!app.getState('loaded')) {
                updateInfoText();
                return [{
                  div: {
                    className: "text-center text-gray-400 py-10",
                    text: "加载中..."
                  }
                }];
              }
              
              const filter = app.getState('filter');
              const sortBy = app.getState('sortBy');
              const visFilter = app.getState('visFilter');
              const websiteFilter = app.getState('websiteFilter');
              
              // 使用优化后的过滤和排序函数
              let filtered = filterSchools(data, filter, visFilter, websiteFilter);
              filtered = sortSchools(filtered, sortBy);
              
              if (filtered.length === 0) {
                return [{
                  div: {
                    className: "text-center text-gray-400 py-10",
                    text: "没有找到相关学校"
                  }
                }];
              }
              
              return filtered.map(school => ({
                div: {
                  className: "flex flex-col sm:flex-row items-stretch sm:items-center py-5 px-6 sm:px-8 hover:bg-gray-50 transition rounded-md group gap-2 sm:gap-0",
                  children: [
                    // Title column
                    {
                      div: {
                        className: "flex-1 flex items-center text-lg font-medium text-gray-900 group-hover:text-primary-600 min-w-0 justify-start",
                        children: [
                          { span: { className: "truncate", text: school.title } }
                        ]
                      }
                    },
                    // Links column
                    {
                      div: {
                        className: "flex flex-row gap-2 w-full sm:w-auto justify-start items-start",
                        children: [
                          linkOrDisabled({ href: school.website, text: "官网", isMain: true }),
                          linkOrDisabled({ href: school.vis, text: "VIS", isMain: false })
                        ]
                      }
                    }
                  ]
                }
              }));
            }
          }
        }
      ]
    }
  }
});

// 数据加载与错误处理
fetch('schools.json')
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(json => {
    data = json;
    // 计算一次统计数据，不随过滤变化
    calculateStats(data);
    updateInfoText();
    app.setState('loaded', true);
  })
  .catch(error => {
    console.error('数据加载失败:', error);
    // 可以在这里添加用户友好的错误提示
    const errorDiv = document.createElement('div');
    errorDiv.className = "text-center text-red-600 py-4";
    errorDiv.textContent = "数据加载失败，请刷新页面重试";
    document.body.insertBefore(errorDiv, infoPanel.nextSibling);
  });

app.render('#app'); 