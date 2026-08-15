/**
 * 3D场景主控制器
 * 统一管理所有阶段场景的切换和交互
 */
import * as THREE from "three";
import SceneManager from "./core/SceneManager.js";
import ExplorationStage from "./stages/ExplorationStage.js";
import OpenPitStage from "./stages/OpenPitStage.js";
import UndergroundStage from "./stages/UndergroundStage.js";
import ReclamationStage from "./stages/ReclamationStage.js";

export class SceneController {
  constructor(container) {
    // 核心场景管理器
    this.sceneManager = new SceneManager(container);

    // 根据配置文件创建阶段场景映射
    this.stages = {};
    this.stageClasses = {
      exploration: ExplorationStage,
      "open-pit": OpenPitStage, // 露天开采
      underground: UndergroundStage, // 地下开采
      reclamation: ReclamationStage, // 生态治理闭坑复垦
    };

    // 初始化阶段类
    Object.keys(this.stageClasses).forEach((stageId) => {
      this.stages[stageId] = new this.stageClasses[stageId](this.sceneManager);
    });

    // 当前阶段
    this.currentStage = null;

    // 事件监听
    this.setupEventListeners();

    console.log(
      "SceneController 初始化完成，可用阶段:",
      Object.keys(this.stages),
    );
  }

  /**
   * 设置事件监听
   */
  setupEventListeners() {
    // 监听热点点击事件
    this.sceneManager.on("hotspot-click", (data) => {
      this.handleHotspotClick(data);
    });

    // 监听相机过渡完成事件
    this.sceneManager.on("camera-transition-complete", () => {
      this.handleCameraTransitionComplete();
    });
  }

  /**
   * 切换到指定阶段
   */
  switchToStage(stageId) {
    console.log("SceneController.switchToStage 被调用，stageId:", stageId);
    console.log("可用的阶段:", Object.keys(this.stages));

    if (!this.stages[stageId]) {
      console.error(`未找到阶段: ${stageId}`);
      console.error("可用阶段ID:", Object.keys(this.stages));
      this.emit("stage-changed", { error: "Stage not found", stageId });
      return;
    }

    // 如果当前已经是该阶段，不重复切换
    if (this.currentStage === stageId) {
      console.log("已经是当前阶段，跳过切换");
      return;
    }

    console.log(`切换到阶段: ${stageId}`);

    try {
      // 保存旧阶段ID
      const oldStage = this.currentStage;

      // 彻底清除旧阶段的所有对象和SceneManager的基础地形
      if (oldStage !== null) {
        console.log("清除旧阶段的所有对象:", oldStage);

        // 清除旧阶段的对象
        if (this.stages[oldStage] && this.stages[oldStage].dispose) {
          this.stages[oldStage].dispose();
        }

        // 彻底清除场景管理器中的所有对象，包括基础地形
        this.thoroughlyClearScene();

        // 强制清除SceneManager的基础地形
        if (this.sceneManager.objects?.terrain) {
          this.sceneManager.scene.remove(this.sceneManager.objects.terrain);
          if (this.sceneManager.objects.terrain.geometry) {
            this.sceneManager.objects.terrain.geometry.dispose();
          }
          if (this.sceneManager.objects.terrain.material) {
            this.sceneManager.objects.terrain.material.dispose();
          }
          this.sceneManager.objects.terrain = null;
        }
      }

      console.log("开始构建场景，阶段:", stageId);
      // 构建新场景
      this.stages[stageId].build();
      console.log("场景构建完成");

      // 始终执行相机过渡动画，确保视角正确切换
      console.log("添加相机过渡动画");
      this.transitionCamera(stageId);

      // 更新当前阶段
      this.currentStage = stageId;

      // 触发阶段切换事件
      const eventData = {
        from: oldStage,
        to: stageId,
        stageData: this.getStageData(stageId),
      };
      console.log("SceneController: 发出stage-changed事件", eventData);
      console.log("SceneController: 当前阶段已设置为:", this.currentStage);
      this.emit("stage-changed", eventData);

      console.log("SceneController: 阶段切换完成，发出stage-changed事件", {
        from: oldStage,
        to: stageId,
      });
    } catch (error) {
      console.error("阶段切换失败:", error);
      console.error("错误堆栈:", error.stack);
      this.emit("stage-changed", { error: error.message, stageId });
    }
  }

  /**
   * 阶段间相机过渡
   */
  transitionCamera(stageId) {
    const cameraPositions = {
      exploration: {
        position: new THREE.Vector3(150, 100, 150),
        target: new THREE.Vector3(0, 10, 0),
      },
      "open-pit": {
        // 露天开采 - 俯视角度查看边坡
        position: new THREE.Vector3(250, 200, 250),
        target: new THREE.Vector3(0, -40, 0),
      },
      underground: {
        // 地下开采 - 降低相机高度避免被地表地形遮挡
        position: new THREE.Vector3(200, -150, 200),
        target: new THREE.Vector3(0, -180, 0),
      },
      reclamation: {
        // 生态治理闭坑复垦 - 平视角度查看复垦效果
        position: new THREE.Vector3(250, 80, 250),
        target: new THREE.Vector3(0, 10, 0),
      },
    };

    const target = cameraPositions[stageId];
    if (target) {
      this.sceneManager.animateCamera(
        target.position,
        target.target,
        2.5, // 过渡时间（秒）
      );
    }
  }

  /**
   * 获取阶段数据
   */
  getStageData(stageId) {
    const stageInfo = {
      exploration: {
        id: "exploration",
        name: "前期准备阶段",
        nameEn: "Preparation Phase",
        description:
          "矿山开发的前期准备工作，包括地质勘探、开采计划制定和基础设施建设",
        duration: "1-3年",
        color: "#00BCD4",
      },
      "open-pit": {
        // 露天开采
        id: "open-pit",
        name: "露天开采阶段",
        nameEn: "Open Pit Mining",
        description: "采用台阶式开采方法，自上而下分层剥离和采矿",
        duration: "10-30年",
        color: "#FF9800",
      },
      underground: {
        // 地下开采
        id: "underground",
        name: "地下开采阶段",
        nameEn: "Underground Mining",
        description: "采用井工开采方法，进行地下矿产资源回收",
        duration: "15-40年",
        color: "#9C27B0",
      },
      reclamation: {
        // 生态治理闭坑复垦
        id: "reclamation",
        name: "生态治理闭坑复垦",
        nameEn: "Ecological Restoration",
        description: "矿山闭坑后的生态修复和土地复垦工作，实现矿区可持续发展",
        duration: "5-10年",
        color: "#4CAF50",
      },
    };

    return stageInfo[stageId] || null;
  }

  /**
   * 处理热点点击
   */
  handleHotspotClick(data) {
    console.log("热点点击:", data);

    // 触发热点点击事件
    this.emit("hotspot-clicked", {
      hotspotData: data,
      currentStage: this.currentStage,
    });
  }

  /**
   * 处理相机过渡完成
   */
  handleCameraTransitionComplete() {
    console.log("相机过渡完成");

    // 触发过渡完成事件
    this.emit("camera-ready", {
      stage: this.currentStage,
    });
  }

  /**
   * 获取当前阶段的热点列表
   */
  getCurrentHotspots() {
    if (!this.currentStage || !this.stages[this.currentStage]) {
      return [];
    }

    return this.stages[this.currentStage].hotspots || [];
  }

  /**
   * 获取所有可用的阶段
   */
  getAvailableStages() {
    return Object.keys(this.stages).map((stageId) =>
      this.getStageData(stageId),
    );
  }

  /**
   * 初始化（加载第一个阶段）
   */
  initialize() {
    // 默认加载勘探阶段
    this.switchToStage("exploration");
  }

  /**
   * 彻底清除场景中所有对象
   */
  thoroughlyClearScene() {
    const scene = this.sceneManager.scene;
    const objectsToRemove = [];

    // 遍历场景中的所有对象
    scene.traverse((object) => {
      // 排除相机和光源等核心对象
      if (object.isMesh &&
          object !== this.sceneManager.objects?.terrain &&
          !this.isLight(object)) {
        objectsToRemove.push(object);
      }
    });

    // 移除找到的对象
    objectsToRemove.forEach(obj => {
      scene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();

      // 递归处理子对象
      obj.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        }
      });
    });

    console.log(`彻底清除了 ${objectsToRemove.length} 个场景对象`);
  }

  /**
   * 检查对象是否是光源
   */
  isLight(object) {
    if (!object || !object.type) return false;
    return object.type === 'AmbientLight' ||
           object.type === 'DirectionalLight' ||
           object.type === 'HemisphereLight' ||
           object.type === 'PointLight' ||
           object.type === 'SpotLight' ||
           object.type === 'RectAreaLight';
  }

  /**
   * 调整场景大小
   */
  resize() {
    // 场景管理器会自动处理窗口大小调整
  }

  /**
   * 销毁控制器
   */
  dispose() {
    // 销毁所有阶段
    Object.values(this.stages).forEach((stage) => {
      if (stage.dispose) {
        stage.dispose();
      }
    });

    // 销毁场景管理器
    this.sceneManager.dispose();

    console.log("SceneController 已销毁");
  }

  /**
   * 事件发射
   */
  emit(eventName, data) {
    if (this.eventListeners && this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach((callback) => {
        callback(data);
      });
    }
  }

  /**
   * 添加事件监听
   */
  on(eventName, callback) {
    if (!this.eventListeners) {
      this.eventListeners = {};
    }
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  }

  /**
   * 移除事件监听
   */
  off(eventName, callback) {
    if (this.eventListeners && this.eventListeners[eventName]) {
      const index = this.eventListeners[eventName].indexOf(callback);
      if (index > -1) {
        this.eventListeners[eventName].splice(index, 1);
      }
    }
  }

  // 导出3D场景管理器供外部使用（如Vue组件）
  get scene() {
    return this.sceneManager.scene;
  }

  get camera() {
    return this.sceneManager.camera;
  }

  get renderer() {
    return this.sceneManager.renderer;
  }

  get controls() {
    return this.sceneManager.controls;
  }
}

export default SceneController;
