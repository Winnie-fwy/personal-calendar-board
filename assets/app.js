(function () {
  var STORAGE_KEY = "personal-calendar-board-tasks";
  var defaultTasks = [
    {
      id: "t1",
      title: "秋招｜行测资料分析 30 题",
      module: "学习计划",
      time: "09:00",
      priority: "高",
      tagClass: "",
      reminder: "提前 30 分钟",
      done: false
    },
    {
      id: "t0",
      title: "昨日逾期｜教资科目二材料分析 1 套",
      module: "学习计划",
      time: "昨天 22:00",
      priority: "高",
      tagClass: "overdue",
      reminder: "昨日未完成，已自动转入今日",
      done: false,
      overdue: true,
      originallyDue: "昨天"
    },
    {
      id: "t2",
      title: "论文｜整理第二章参考文献",
      module: "学习计划",
      time: "11:30",
      priority: "中",
      tagClass: "",
      reminder: "截止前 1 天",
      done: false
    },
    {
      id: "t3",
      title: "基金｜支付宝定投检查",
      module: "投资提醒",
      time: "14:45",
      priority: "高",
      tagClass: "warn",
      reminder: "交易日前 1 天",
      done: false
    },
    {
      id: "t4",
      title: "健康｜记录睡眠和饮水",
      module: "健康记录",
      time: "21:30",
      priority: "中",
      tagClass: "health",
      reminder: "每天重复",
      done: true
    },
    {
      id: "t5",
      title: "生活｜采购清单确认",
      module: "日常提醒",
      time: "18:00",
      priority: "低",
      tagClass: "life",
      reminder: "到点提醒",
      done: false
    }
  ];

  function loadTasks() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      return normalizeOverdueTasks(mergeDefaultTasks(saved ? JSON.parse(saved) : defaultTasks.slice()));
    } catch (error) {
      return normalizeOverdueTasks(mergeDefaultTasks(defaultTasks.slice()));
    }
  }

  function mergeDefaultTasks(taskList) {
    var merged = taskList.slice();
    defaultTasks.forEach(function (defaultTask) {
      if (!merged.some(function (task) { return task.id === defaultTask.id; })) {
        merged.push(Object.assign({}, defaultTask));
      }
    });
    return merged;
  }

  function normalizeOverdueTasks(taskList) {
    return taskList.map(function (task) {
      if (task.overdue && !task.done) {
        return Object.assign({}, task, {
          time: task.time.indexOf("昨天") >= 0 ? "今日补做" : task.time,
          tagClass: "overdue",
          reminder: "昨日逾期，已自动转入今日"
        });
      }
      return task;
    });
  }

  function saveTasks() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      return null;
    }
  }

  var tasks = loadTasks();

  var libraries = [
    {
      id: "calendar",
      icon: "日",
      title: "总日历库",
      count: "8 条",
      desc: "今天、明天和近期所有有时间点的事项。",
      records: [
        {
          title: "今天 09:00｜秋招行测资料分析 30 题",
          status: "待完成",
          statusType: "warn",
          rows: [["模块", "学习计划 · 秋招"], ["提醒", "08:30 系统日历提醒"], ["关联任务", "秋招｜资料分析 30 题"]]
        },
        {
          title: "今天 14:45｜支付宝基金定投检查",
          status: "高优先",
          statusType: "warn",
          rows: [["模块", "投资提醒"], ["提醒", "14:15 系统日历提醒"], ["记录", "检查是否按定投计划执行"]]
        },
        {
          title: "今天 18:00｜采购清单确认",
          status: "待办",
          statusType: "",
          rows: [["模块", "日常提醒"], ["清单", "牛奶、纸巾、水果、洗衣液"], ["处理方式", "完成后勾选，未完成顺延到明天"]]
        },
        {
          title: "明天 10:00｜论文第二章结构修改",
          status: "已排期",
          statusType: "",
          rows: [["模块", "毕业论文"], ["提醒", "明天 09:00"], ["关联知识", "文献综述模板、导师修改意见"]]
        }
      ]
    },
    {
      id: "tasks",
      icon: "✓",
      title: "任务库",
      count: "9 个",
      desc: "拆成可执行动作，今天做完就打勾。",
      records: [
        {
          title: "秋招｜资料分析 30 题",
          status: "进行中",
          statusType: "warn",
          rows: [["拆分", "15 题计时练习 + 15 题错题复盘"], ["预计耗时", "70 分钟"], ["完成标准", "正确率 ≥ 80%，错题写入知识库"]]
        },
        {
          title: "逾期｜教资科目二材料分析 1 套",
          status: "昨日逾期",
          statusType: "warn",
          rows: [["处理", "昨日未完成，今天自动转入待办"], ["预计耗时", "45 分钟"], ["完成标准", "写完一套并把模板补进知识库"]]
        },
        {
          title: "教资｜科目二材料分析 1 套",
          status: "未开始",
          statusType: "",
          rows: [["拆分", "先写答案，再对照模板补关键词"], ["预计耗时", "45 分钟"], ["关联资料", "教育观、学生观、教师观答题模板"]]
        },
        {
          title: "健康｜记录睡眠和饮水",
          status: "已完成",
          statusType: "done",
          rows: [["记录", "睡眠 7.2 小时，饮水 1600ml"], ["身体反馈", "上午精神一般，下午状态恢复"], ["后续", "晚间补充是否影响学习效率"]]
        },
        {
          title: "灵感｜整理教师编备考路径",
          status: "待整理",
          statusType: "",
          rows: [["下一步", "拆成 3 个月学习路线"], ["可转化", "生成教招学习计划"], ["沉淀方式", "整理到知识库的“职业规划/备考路径”体系"]]
        }
      ]
    },
    {
      id: "knowledge",
      icon: "知",
      title: "知识库",
      count: "16 篇",
      desc: "按体系沉淀学习、投资、健康和灵感，支持后续不断扩展。",
      records: [
        {
          title: "学习体系｜秋招资料分析",
          status: "体系节点",
          statusType: "",
          rows: [["结构", "题型库 → 速算技巧 → 错题归因 → 套卷复盘"], ["当前沉淀", "增长率比较、比重变化、基期量估算"], ["下次扩展", "把每次错题自动归入对应题型"]]
        },
        {
          title: "教资体系｜材料分析题模板",
          status: "模板",
          statusType: "",
          rows: [["结构", "理论判断 → 材料定位 → 规范表达 → 答题模板"], ["关键词", "学生观、教师观、教育观"], ["下次扩展", "每做一套题补充一个高频表达"]]
        },
        {
          title: "投资体系｜基金定投复盘库",
          status: "经验库",
          statusType: "warn",
          rows: [["踩坑点", "看到短期下跌容易临时加仓，偏离原计划"], ["经验", "先记录波动原因，再决定是否按原定投计划执行"], ["教训", "不要把情绪当成交易信号，先看周期和仓位"]]
        },
        {
          title: "投资体系｜股票交易观察卡",
          status: "交易知识",
          statusType: "",
          rows: [["记录框架", "买入理由、卖出条件、风险点、复盘结论"], ["收获", "交易前写清楚条件，交易后才知道是否执行纪律"], ["下次扩展", "每次平安证券操作后自动生成一张交易复盘卡"]]
        },
        {
          title: "健康体系｜睡眠与学习效率",
          status: "健康知识",
          statusType: "done",
          rows: [["观察", "连续三天少于 7 小时会影响下午学习效率"], ["体会", "睡眠不足时不适合安排高强度刷题"], ["下次扩展", "把睡眠、饮水、运动和学习完成率做关联"]]
        }
      ]
    },
    {
      id: "review",
      icon: "复",
      title: "复盘库",
      count: "5 篇",
      desc: "根据当天任务、逾期、知识沉淀自动形成每日总结。",
      records: [
        {
          title: "今日自动总结｜任务完成情况",
          status: "今日",
          statusType: "warn",
          rows: [["完成", "健康记录已完成，学习任务完成 1/3"], ["逾期", "教资材料分析从昨日转入今日"], ["建议", "先处理逾期任务，再做新增任务"]]
        },
        {
          title: "今日自动总结｜学习模块",
          status: "学习",
          statusType: "",
          rows: [["发现", "资料分析和教资材料分析同时排到今天，学习压力偏大"], ["沉淀", "资料分析错题写入“秋招资料分析体系”"], ["明日", "只保留一个高强度学习任务"]]
        },
        {
          title: "今日自动总结｜投资模块",
          status: "投资",
          statusType: "done",
          rows: [["操作", "只检查基金定投状态，没有临时买卖"], ["提炼", "新增一条踩坑点：短期下跌时容易冲动加仓"], ["收获", "继续把每次投资情况沉淀到投资经验库"]]
        },
        {
          title: "今日自动总结｜生活与健康",
          status: "生活",
          statusType: "",
          rows: [["生活", "采购清单待完成，适合放在下班后处理"], ["健康", "睡眠和饮水已记录"], ["提醒", "晚上不要再新增大任务，留时间做复盘"]]
        }
      ]
    }
  ];

  var sharedPeople = [
    {
      name: "我",
      role: "OPPO · 今日计划共享给对象",
      progress: 20,
      summary: "今日 5 项任务，已完成 1 项；学习和投资提醒对对象可见。",
      visible: "对象可看：今日进度、共享知识库、复盘摘要"
    },
    {
      name: "对象",
      role: "小米 · 对象知识库授权给我",
      progress: 55,
      summary: "对象侧示例：运动、生活、灵感内容可共享，私密内容默认隐藏。",
      visible: "我可看：对象授权资料、重要提醒、共同事项"
    }
  ];

  var taskList = document.getElementById("taskList");
  var libraryGrid = document.getElementById("libraryGrid");
  var libraryGridDetail = document.getElementById("libraryGridDetail");
  var libraryDetail = document.getElementById("libraryDetail");
  var miniToday = document.getElementById("miniToday");
  var shareGrid = document.getElementById("shareGrid");
  var chatForm = document.getElementById("chatForm");
  var chatInput = document.getElementById("chatInput");
  var chatWindow = document.getElementById("chatWindow");
  var structuredPreview = document.getElementById("structuredPreview");
  var toast = document.getElementById("toast");
  var activeLibraryId = "calendar";

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  function setToday() {
    var now = new Date();
    document.getElementById("dateDay").textContent = String(now.getDate()).padStart(2, "0");
    document.getElementById("dateMonth").textContent = (now.getMonth() + 1) + "月";
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
      var item = document.createElement("article");
      item.className = "task-item" + (task.done ? " done" : "");
      item.dataset.id = task.id;
      item.innerHTML =
        '<button class="task-check" aria-label="切换完成状态"></button>' +
        '<div>' +
          '<p class="task-title">' + task.title + '</p>' +
          '<div class="task-meta">' +
            '<span class="tag ' + task.tagClass + '">' + task.module + '</span>' +
            '<span>优先级：' + task.priority + '</span>' +
            '<span>提醒：' + task.reminder + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="task-time">' + task.time + '</div>';
      taskList.appendChild(item);
    });
  }

  function addTaskFromStructured(structured) {
    tasks.push({
      id: "ai-" + Date.now(),
      title: structured.title,
      module: structured.module,
      time: structured.time,
      priority: structured.priority,
      tagClass: structured.tagClass,
      reminder: structured.reminder,
      done: false,
      source: "chat"
    });
    saveTasks();
    renderTasks();
    updateStats();
    if (activeLibraryId === "review") renderDetail("review");
  }

  function renderMiniToday() {
    if (!miniToday) return;
    miniToday.innerHTML = tasks.slice(0, 3).map(function (task) {
      return '<div class="mini-row">' +
        '<span>' + task.time + '</span>' +
        '<b>' + task.title.replace(/｜/g, " · ") + '</b>' +
        '<span>' + (task.done ? "已完成" : "待办") + '</span>' +
      '</div>';
    }).join("");
  }

  function renderLibraries(target, includeAction) {
    target.innerHTML = "";
    libraries.forEach(function (library, index) {
      var card = document.createElement("button");
      card.className = "library-card" + (index === 0 && includeAction ? " active" : "");
      card.dataset.library = library.id;
      card.innerHTML =
        '<span class="library-count">' + library.count + '</span>' +
        '<div class="library-icon">' + library.icon + '</div>' +
        '<h3>' + library.title + '</h3>' +
        '<p>' + library.desc + '</p>';
      target.appendChild(card);
    });
  }

  function renderDetail(id) {
    var library = libraries.find(function (item) { return item.id === id; }) || libraries[0];
    activeLibraryId = library.id;
    var records = library.id === "review" ? buildReviewLibraryRecords() : library.records;
    libraryDetail.innerHTML =
      '<h3>' + library.title + '</h3>' +
      '<p class="empty-hint">' + library.desc + '</p>' +
      '<div class="library-record-list">' +
        records.map(function (record) {
          return '<article class="record-card">' +
            '<div class="record-top">' +
              '<p class="record-title">' + record.title + '</p>' +
              '<span class="record-status ' + record.statusType + '">' + record.status + '</span>' +
            '</div>' +
            '<div class="record-meta">' +
              record.rows.map(function (row) {
                return '<div><span>' + row[0] + '</span><strong>' + row[1] + '</strong></div>';
              }).join("") +
            '</div>' +
          '</article>';
        }).join("") +
      '</div>';
    Array.prototype.forEach.call(libraryGridDetail.querySelectorAll(".library-card"), function (card) {
      card.classList.toggle("active", card.dataset.library === id);
    });
  }

  function buildReviewLibraryRecords() {
    var total = tasks.length;
    var done = tasks.filter(function (task) { return task.done; }).length;
    var overdue = tasks.filter(function (task) { return task.overdue && !task.done; });
    var high = tasks.filter(function (task) { return task.priority === "高" && !task.done; });
    var percent = total ? Math.round(done / total * 100) : 0;
    return [
      {
        title: "今日自动总结｜任务完成情况",
        status: percent + "%",
        statusType: percent >= 80 ? "done" : "warn",
        rows: [["完成", done + " / " + total + " 项"], ["逾期", overdue.length ? overdue.map(function (task) { return task.title; }).join("；") : "无"], ["下一步", high.length ? "优先处理：" + high[0].title : "整理知识库和复盘"]]
      },
      {
        title: "今日自动总结｜学习模块",
        status: "学习",
        statusType: "",
        rows: [["观察", "学习任务集中在秋招、教资和论文"], ["风险", overdue.length ? "逾期任务会挤压今日学习时间" : "今日节奏正常"], ["建议", "高强度学习任务每天最多保留 2 个"]]
      },
      {
        title: "今日自动总结｜投资模块",
        status: "投资",
        statusType: "done",
        rows: [["今日事项", "基金定投检查"], ["提炼方向", "把投资情况沉淀为踩坑点、经验、教训、收获、体会"], ["建议", "只记录判断过程，不被短期涨跌牵着走"]]
      },
      {
        title: "今日自动总结｜生活与健康",
        status: "生活",
        statusType: "",
        rows: [["生活", "采购清单适合放在下班后完成"], ["健康", "睡眠和饮水记录完成后再做复盘"], ["提醒", "晚上不要再新增大任务，避免继续逾期"]]
      }
    ];
  }

  function updateStats() {
    var total = tasks.length;
    var done = tasks.filter(function (task) { return task.done; }).length;
    var high = tasks.filter(function (task) { return task.priority === "高" && !task.done; }).length;
    var percent = total ? Math.round(done / total * 100) : 0;
    document.getElementById("statTodo").textContent = String(total - done);
    document.getElementById("statFocus").textContent = String(high);
    document.getElementById("completionText").textContent = percent + "% 完成";
    document.getElementById("progressFill").style.width = percent + "%";
    renderMiniToday();
    renderShare(percent);
    renderReview(percent, done, total);
  }

  function renderShare(myPercent) {
    if (!shareGrid) return;
    shareGrid.innerHTML = sharedPeople.map(function (person, index) {
      var progress = index === 0 ? myPercent : person.progress;
      return '<article class="person-card">' +
        '<div class="avatar">' + person.name.slice(0, 1) + '</div>' +
        '<div>' +
          '<h3>' + person.name + '</h3>' +
          '<p>' + person.role + '</p>' +
          '<div class="meter" aria-label="完成进度"><i style="width:' + progress + '%"></i></div>' +
          '<ul class="detail-list">' +
            '<li><span>今日进度</span><strong>' + progress + '%</strong></li>' +
            '<li><span>共享说明</span><strong>' + person.visible + '</strong></li>' +
            '<li><span>摘要</span><strong>' + person.summary + '</strong></li>' +
          '</ul>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  function renderReview(percent, done, total) {
    document.getElementById("reviewTitle").textContent = "今日完成率 " + percent + "%";
    var unfinished = tasks.filter(function (task) { return !task.done; });
    document.getElementById("reviewSummary").textContent =
      done === total
        ? "今天的计划已经全部完成，可以进入知识沉淀和明日安排。"
        : "今天已完成 " + done + " 项，还剩 " + unfinished.length + " 项。建议优先处理高优先级和有截止时间的任务。";
    document.getElementById("reviewList").innerHTML =
      '<li><span>已完成</span><strong>' + done + ' / ' + total + '</strong></li>' +
      '<li><span>待处理重点</span><strong>' + (unfinished[0] ? unfinished[0].title : "无") + '</strong></li>' +
      '<li><span>知识沉淀提醒</span><strong>完成学习/投资任务后补充笔记</strong></li>' +
      '<li><span>明日建议</span><strong>保留 3 件关键任务，避免排满</strong></li>';
  }

  function switchScreen(name) {
    Array.prototype.forEach.call(document.querySelectorAll(".screen"), function (screen) {
      screen.classList.toggle("active", screen.dataset.screen === name);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".nav-btn"), function (btn) {
      btn.classList.toggle("active", btn.dataset.nav === name);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function appendChat(role, text) {
    if (!chatWindow) return;
    var bubble = document.createElement("div");
    bubble.className = "chat-bubble" + (role === "user" ? " user" : "");
    bubble.textContent = text;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function inferModule(text) {
    if (/基金|股票|证券|定投|买入|卖出|加仓|减仓|投资|平安证券|支付宝/.test(text)) return ["投资提醒", "warn"];
    if (/论文|毕业论文|文献|导师|开题|答辩/.test(text)) return ["毕业论文", ""];
    if (/秋招|行测|申论|面试|简历|笔试|教招|教资|普通话|刷题|学习/.test(text)) return ["学习计划", ""];
    if (/医院|就医|复诊|体检|睡眠|饮水|用药|健康|牙|口腔/.test(text)) return ["健康记录", "health"];
    if (/跑步|运动|健身|拉伸|瑜伽|打卡/.test(text)) return ["日常运动", "health"];
    if (/买|购物|采购|快递|缴费|生活|打扫|整理房间/.test(text)) return ["日常提醒", "life"];
    if (/灵感|想法|记录一下|规划|思路/.test(text)) return ["灵感收集", ""];
    return ["日常提醒", ""];
  }

  function inferTime(text) {
    var period = "";
    if (/明天/.test(text)) period = "明天";
    else if (/后天/.test(text)) period = "后天";
    else if (/今晚|今天|下午|上午|中午|晚上|早上/.test(text)) period = "今天";
    else period = "今天";

    var hour = null;
    var minute = "00";
    var match = text.match(/(\d{1,2})[:：点](\d{1,2})?/);
    if (match) {
      hour = parseInt(match[1], 10);
      if (match[2]) minute = String(match[2]).padStart(2, "0");
    }
    if (hour !== null) {
      if (/下午|晚上|今晚/.test(text) && hour < 12) hour += 12;
      return period + " " + String(hour).padStart(2, "0") + ":" + minute;
    }
    if (/早上|上午/.test(text)) return period + " 上午";
    if (/中午/.test(text)) return period + " 中午";
    if (/下午/.test(text)) return period + " 下午";
    if (/晚上|今晚/.test(text)) return period + " 晚上";
    return period;
  }

  function inferPriority(text, module) {
    if (/高优先级|重要|紧急|必须|截止|考试|面试|复诊|交易|逾期/.test(text)) return "高";
    if (module === "投资提醒" || module === "健康记录") return "高";
    if (/低优先级|不急|有空/.test(text)) return "低";
    return "中";
  }

  function inferReminder(text, priority, time) {
    if (/不提醒|无需提醒/.test(text)) return "不提醒";
    if (/提前一天|前一天/.test(text)) return "提前 1 天";
    if (/提前半小时|30分钟|三十分钟/.test(text)) return "提前 30 分钟";
    if (/提醒/.test(text)) return priority === "高" ? "提前 30 分钟" : "提前 10 分钟";
    if (/明天|后天|上午|下午|晚上|\d{1,2}[:：点]/.test(time)) return priority === "高" ? "提前 30 分钟" : "提前 10 分钟";
    return "待设置";
  }

  function cleanTitle(text, module) {
    var title = text
      .replace(/请|帮我|提醒我|记一下|我想|我要|需要/g, "")
      .replace(/高优先级|低优先级|重要|紧急|不急|有空/g, "")
      .replace(/提前一天|前一天|提前半小时|30分钟|三十分钟/g, "")
      .replace(/[，。,.]/g, " ")
      .trim();
    if (!title) title = "新任务";
    if (title.length > 32) title = title.slice(0, 32) + "…";
    return module + "｜" + title;
  }

  function structureInput(text) {
    var moduleInfo = inferModule(text);
    var module = moduleInfo[0];
    var time = inferTime(text);
    var priority = inferPriority(text, module);
    return {
      title: cleanTitle(text, module),
      module: module,
      time: time,
      priority: priority,
      tagClass: moduleInfo[1],
      reminder: inferReminder(text, priority, time)
    };
  }

  function renderStructuredPreview(structured) {
    if (!structuredPreview) return;
    structuredPreview.classList.add("show");
    structuredPreview.innerHTML =
      "已结构化：" +
      "模块「" + structured.module + "」 · " +
      "时间「" + structured.time + "」 · " +
      "优先级「" + structured.priority + "」 · " +
      "提醒「" + structured.reminder + "」";
  }

  document.addEventListener("click", function (event) {
    var taskItem = event.target.closest(".task-item");
    if (taskItem && event.target.closest(".task-check")) {
      var task = tasks.find(function (item) { return item.id === taskItem.dataset.id; });
      if (task) {
        task.done = !task.done;
        saveTasks();
        renderTasks();
        updateStats();
        if (activeLibraryId === "review") renderDetail("review");
        showToast(task.done ? "已打勾：任务完成，晚间会进入复盘。" : "已取消完成状态。");
      }
      return;
    }

    var nav = event.target.closest("[data-nav]");
    if (nav) {
      switchScreen(nav.dataset.nav);
      return;
    }

    var jump = event.target.closest("[data-jump]");
    if (jump) {
      switchScreen(jump.dataset.jump);
      return;
    }

    var libraryCard = event.target.closest("[data-library]");
    if (libraryCard) {
      switchScreen("libraries");
      renderDetail(libraryCard.dataset.library);
      return;
    }

    var switchBtn = event.target.closest(".switch");
    if (switchBtn) {
      if (switchBtn.id === "notifyBtn") return;
      switchBtn.classList.toggle("on");
      showToast(switchBtn.classList.contains("on") ? "设置已开启。" : "设置已关闭。");
    }
  });

  if (chatForm) {
    chatForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var text = chatInput.value.trim();
      if (!text) {
        showToast("先输入一条任务或想法。");
        return;
      }
      appendChat("user", text);
      var structured = structureInput(text);
      addTaskFromStructured(structured);
      renderStructuredPreview(structured);
      appendChat("assistant", "已加入任务库：" + structured.title + "。我识别为「" + structured.module + "」，时间「" + structured.time + "」，优先级「" + structured.priority + "」，提醒「" + structured.reminder + "」。");
      chatInput.value = "";
      showToast("已从对话生成任务，并保存到今日计划。");
    });
  }

  document.getElementById("notifyBtn").addEventListener("click", function () {
    this.classList.toggle("on");
    createCalendarFile();
    showToast("已生成系统日历导入文件。安卓可用日历 App 打开导入，独立 App 阶段可直接写入系统日历。");
  });

  function createCalendarFile() {
    var task = tasks.find(function (item) { return item.priority === "高" && !item.done; }) || tasks[0];
    var now = new Date();
    var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
    var end = new Date(start.getTime() + 45 * 60 * 1000);
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var format = function (date) {
      return date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()) + "T" + pad(date.getHours()) + pad(date.getMinutes()) + "00";
    };
    var ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Personal Calendar Board//CN",
      "BEGIN:VEVENT",
      "UID:" + Date.now() + "@personal-calendar-board",
      "DTSTAMP:" + format(now),
      "DTSTART:" + format(start),
      "DTEND:" + format(end),
      "SUMMARY:" + task.title,
      "DESCRIPTION:来自专属日历看板的系统日历提醒示例。后续独立 App 可直接调用安卓日历权限写入。",
      "BEGIN:VALARM",
      "TRIGGER:-PT30M",
      "ACTION:DISPLAY",
      "DESCRIPTION:" + task.title,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "今日强提醒示例.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  document.getElementById("notifyBtn").addEventListener("dblclick", function () {
    if (!("Notification" in window)) {
      showToast("当前环境不支持浏览器通知，安卓强提醒建议走系统日历或原生 App 通知。");
      return;
    }
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        showToast("浏览器通知已开启；正式版仍建议接入安卓系统日历。");
        new Notification("专属日历看板", {
          body: "示例提醒：今天还有高优先级任务待完成。"
        });
      } else {
        showToast("未开启浏览器通知，可优先使用系统日历提醒。");
      }
    });
  });

  document.getElementById("quickAdd").addEventListener("click", function () {
    var title = window.prompt("新增一个今日任务：", "灵感｜整理一个新想法");
    if (!title) return;
    tasks.push({
      id: "t" + Date.now(),
      title: title,
      module: "灵感收集",
      time: "今天",
      priority: "中",
      tagClass: "",
      reminder: "待设置",
      done: false
    });
    saveTasks();
    renderTasks();
    updateStats();
    switchScreen("tasks");
    showToast("已新增到任务库，并同步到今日计划。");
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./service-worker.js").catch(function () {
        return null;
      });
    });
  }

  setToday();
  renderTasks();
  renderMiniToday();
  renderLibraries(libraryGrid, false);
  renderLibraries(libraryGridDetail, true);
  renderDetail("calendar");
  renderShare(0);
  updateStats();
})();
