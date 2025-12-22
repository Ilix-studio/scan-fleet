import { useState, useRef, useCallback, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Star,
  Text,
  Arrow,
  RegularPolygon,
  Image as KonvaImage,
  Transformer,
} from "react-konva";
import Konva from "konva";
import {
  Type,
  Square,
  Circle as CircleIcon,
  Star as StarIcon,
  Triangle,
  ArrowRight,
  Car,
  Bike,
  Phone,
  Shield,
  Heart,
  AlertTriangle,
  Plus,
  Minus,
  Download,
  Trash2,
  Copy,
  Layers,
  Move,
  ChevronDown,
  Check,
  Frame,
  Undo2,
  Redo2,
  Upload,
  Save,
  FileCode,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface EditorElement {
  id: string;
  type: "rect" | "circle" | "star" | "triangle" | "arrow" | "text" | "image";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  iconType?: string;
  points?: number[];
  innerRadius?: number;
  outerRadius?: number;
  numPoints?: number;
  borderStyle?: "solid" | "dashed" | "dotted" | "double";
  imageSrc?: string;
  imageElement?: HTMLImageElement;
}

interface HistoryState {
  elements: EditorElement[];
  selectedId: string | null;
}

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  sampleTexts: string[];
}

interface DefaultTemplate {
  id: string;
  name: string;
  emoji: string;
  elements: Partial<EditorElement>[];
}

// Constants
const CANVAS_SIZE = 400;
const EXPORT_SIZE = 800;
const MAX_HISTORY = 50;

const LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    sampleTexts: [
      "SCAN FOR HELP",
      "EMERGENCY",
      "OWNER INFO",
      "CONTACT",
      "CALL NOW",
    ],
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    sampleTexts: [
      "स्कैन करें",
      "आपातकालीन",
      "मालिक जानकारी",
      "संपर्क करें",
      "मदद",
    ],
  },
  {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
    sampleTexts: ["স্কেন কৰক", "জৰুৰীকালীন", "মালিকৰ তথ্য", "যোগাযোগ", "সহায়"],
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    sampleTexts: [
      "স্ক্যান করুন",
      "জরুরি",
      "মালিকের তথ্য",
      "যোগাযোগ",
      "সাহায্য",
    ],
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    sampleTexts: ["ஸ்கேன் செய்", "அவசரம்", "உரிமையாளர்", "தொடர்பு", "உதவி"],
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    sampleTexts: [
      "స్కాన్ చేయండి",
      "అత్యవసరం",
      "యజమాని",
      "సంప్రదించండి",
      "సహాయం",
    ],
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    sampleTexts: ["ಸ್ಕ್ಯಾನ್ ಮಾಡಿ", "ತುರ್ತು", "ಮಾಲೀಕರು", "ಸಂಪರ್ಕಿಸಿ", "ಸಹಾಯ"],
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    sampleTexts: ["സ്കാൻ ചെയ്യുക", "അടിയന്തിരം", "ഉടമ", "ബന്ധപ്പെടുക", "സഹായം"],
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    sampleTexts: ["स्कॅन करा", "आपत्कालीन", "मालक माहिती", "संपर्क", "मदत"],
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    sampleTexts: ["સ્કેન કરો", "કટોકટી", "માલિક માહિતી", "સંપર્ક", "મદદ"],
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    sampleTexts: ["ਸਕੈਨ ਕਰੋ", "ਐਮਰਜੈਂਸੀ", "ਮਾਲਕ ਜਾਣਕਾਰੀ", "ਸੰਪਰਕ", "ਮਦਦ"],
  },
  {
    code: "or",
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    sampleTexts: ["ସ୍କାନ କରନ୍ତୁ", "ଜରୁରୀ", "ମାଲିକ", "ଯୋଗାଯୋଗ", "ସାହାଯ୍ୟ"],
  },
];

const COLORS = [
  "#ffffff",
  "#000000",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
  "#1e293b",
  "#0f172a",
  "#fbbf24",
  "#10b981",
];

const FONT_FAMILIES = [
  { name: "Raleway", value: "Raleway, sans-serif" },
  {
    name: "Noto Sans",
    value: "'Noto Sans Devanagari', 'Noto Sans Bengali', sans-serif",
  },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Impact", value: "Impact, sans-serif" },
];

const DEFAULT_TEMPLATES: DefaultTemplate[] = [
  {
    id: "emergency-basic",
    name: "Emergency Basic",
    emoji: "🆘",
    elements: [
      {
        type: "rect",
        x: 200,
        y: 200,
        width: 360,
        height: 360,
        fill: "#ffffff",
        stroke: "#ef4444",
        strokeWidth: 8,
      },
      {
        type: "text",
        x: 200,
        y: 80,
        text: "🆘 EMERGENCY",
        fontSize: 32,
        fill: "#ef4444",
        fontStyle: "bold",
      },
      {
        type: "text",
        x: 200,
        y: 320,
        text: "SCAN FOR HELP",
        fontSize: 24,
        fill: "#000000",
      },
    ],
  },
  {
    id: "vehicle-info",
    name: "Vehicle Info",
    emoji: "🚗",
    elements: [
      {
        type: "rect",
        x: 200,
        y: 200,
        width: 360,
        height: 360,
        fill: "#1e293b",
        stroke: "#06b6d4",
        strokeWidth: 4,
      },
      {
        type: "text",
        x: 200,
        y: 60,
        text: "🚗",
        fontSize: 48,
        fill: "#ffffff",
      },
      {
        type: "text",
        x: 200,
        y: 120,
        text: "VEHICLE INFO",
        fontSize: 28,
        fill: "#06b6d4",
        fontStyle: "bold",
      },
      {
        type: "text",
        x: 200,
        y: 320,
        text: "Scan QR Code",
        fontSize: 20,
        fill: "#ffffff",
      },
    ],
  },
  {
    id: "bike-safety",
    name: "Bike Safety",
    emoji: "🏍️",
    elements: [
      {
        type: "circle",
        x: 200,
        y: 200,
        radius: 180,
        fill: "#000000",
        stroke: "#22c55e",
        strokeWidth: 6,
      },
      {
        type: "text",
        x: 200,
        y: 80,
        text: "🏍️",
        fontSize: 56,
        fill: "#ffffff",
      },
      {
        type: "text",
        x: 200,
        y: 160,
        text: "RIDER SAFETY",
        fontSize: 24,
        fill: "#22c55e",
        fontStyle: "bold",
      },
      {
        type: "text",
        x: 200,
        y: 300,
        text: "স্কেন কৰক",
        fontSize: 22,
        fill: "#ffffff",
      },
    ],
  },
  {
    id: "family-contact",
    name: "Family Contact",
    emoji: "👨‍👩‍👧",
    elements: [
      {
        type: "rect",
        x: 200,
        y: 200,
        width: 360,
        height: 360,
        fill: "#fef3c7",
        stroke: "#f59e0b",
        strokeWidth: 4,
      },
      {
        type: "text",
        x: 200,
        y: 70,
        text: "👨‍👩‍👧‍👦",
        fontSize: 48,
        fill: "#000000",
      },
      {
        type: "text",
        x: 200,
        y: 130,
        text: "FAMILY CONTACT",
        fontSize: 24,
        fill: "#92400e",
        fontStyle: "bold",
      },
      {
        type: "text",
        x: 200,
        y: 320,
        text: "জৰুৰীকালীন যোগাযোগ",
        fontSize: 18,
        fill: "#78350f",
      },
    ],
  },
];

const generateId = () =>
  `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const generateReferenceCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SF-";
  for (let i = 0; i < 8; i++)
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
};

const StickerEditor = () => {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    LANGUAGES[0]
  );
  const [currentColor, setCurrentColor] = useState("#3b82f6");
  const [currentStroke, setCurrentStroke] = useState("#000000");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "templates" | "shapes" | "icons" | "text" | "borders" | "images"
  >("templates");
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState(FONT_FAMILIES[0].value);
  const [history, setHistory] = useState<HistoryState[]>([
    { elements: [], selectedId: null },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedElement = elements.find((el) => el.id === selectedId);
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const pushHistory = useCallback(
    (newElements: EditorElement[], newSelectedId: string | null) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push({ elements: newElements, selectedId: newSelectedId });
        if (newHistory.length > MAX_HISTORY) newHistory.shift();
        return newHistory;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    },
    [historyIndex]
  );

  const undo = useCallback(() => {
    if (!canUndo) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setElements(history[newIndex].elements);
    setSelectedId(history[newIndex].selectedId);
  }, [canUndo, history, historyIndex]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setElements(history[newIndex].elements);
    setSelectedId(history[newIndex].selectedId);
  }, [canRedo, history, historyIndex]);

  const deleteElement = useCallback(
    (id: string) => {
      const newElements = elements.filter((el) => el.id !== id);
      setElements(newElements);
      const newSelectedId = id === selectedId ? null : selectedId;
      setSelectedId(newSelectedId);
      pushHistory(newElements, newSelectedId);
    },
    [elements, selectedId, pushHistory]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        redo();
      }
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedId &&
        document.activeElement?.tagName !== "INPUT"
      ) {
        e.preventDefault();
        deleteElement(selectedId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, selectedId, deleteElement]);

  useEffect(() => {
    if (!transformerRef.current || !layerRef.current) return;
    const transformer = transformerRef.current;
    if (selectedId) {
      const node = layerRef.current.findOne(`#${selectedId}`);
      if (node) {
        transformer.nodes([node]);
        transformer.getLayer()?.batchDraw();
      }
    } else {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
    }
  }, [selectedId, elements]);

  const addElementWithHistory = useCallback(
    (newElement: EditorElement) => {
      const newElements = [...elements, newElement];
      setElements(newElements);
      setSelectedId(newElement.id);
      pushHistory(newElements, newElement.id);
    },
    [elements, pushHistory]
  );

  const addShape = useCallback(
    (type: EditorElement["type"]) => {
      const baseProps: EditorElement = {
        id: generateId(),
        type,
        x: CANVAS_SIZE / 2,
        y: CANVAS_SIZE / 2,
        fill: currentColor,
        stroke: currentStroke,
        strokeWidth: 2,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      };
      if (type === "rect") {
        baseProps.width = 80;
        baseProps.height = 60;
      } else if (type === "circle") {
        baseProps.radius = 40;
      } else if (type === "star") {
        baseProps.numPoints = 5;
        baseProps.innerRadius = 20;
        baseProps.outerRadius = 40;
      } else if (type === "triangle") {
        baseProps.radius = 40;
      } else if (type === "arrow") {
        baseProps.points = [0, 0, 60, 0];
      }
      addElementWithHistory(baseProps);
    },
    [currentColor, currentStroke, addElementWithHistory]
  );

  const addText = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      addElementWithHistory({
        id: generateId(),
        type: "text",
        x: CANVAS_SIZE / 2,
        y: CANVAS_SIZE / 2,
        fill: currentColor,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        text,
        fontSize,
        fontFamily,
      });
      setTextInput("");
    },
    [currentColor, fontSize, fontFamily, addElementWithHistory]
  );

  const addIcon = useCallback(
    (iconType: string) => {
      const icons: Record<string, string> = {
        car: "🚗",
        bike: "🏍️",
        phone: "📞",
        sos: "🆘",
        medical: "⚕️",
        helmet: "⛑️",
        heart: "❤️",
        warning: "⚠️",
        shield: "🛡️",
      };
      addElementWithHistory({
        id: generateId(),
        type: "text",
        x: CANVAS_SIZE / 2,
        y: CANVAS_SIZE / 2,
        fill: currentColor,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        text: icons[iconType] || "●",
        fontSize: 48,
        fontFamily: "Arial",
        iconType,
      });
    },
    [currentColor, addElementWithHistory]
  );

  const addBorder = useCallback(
    (style: "solid" | "dashed" | "rounded" | "double") => {
      const newElement: EditorElement = {
        id: generateId(),
        type: "rect",
        x: CANVAS_SIZE / 2,
        y: CANVAS_SIZE / 2,
        width: CANVAS_SIZE - 40,
        height: CANVAS_SIZE - 40,
        fill: "transparent",
        stroke: currentStroke,
        strokeWidth: style === "double" ? 6 : 3,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        borderStyle: style === "rounded" ? "solid" : style,
      };
      const newElements = [newElement, ...elements];
      setElements(newElements);
      setSelectedId(newElement.id);
      pushHistory(newElements, newElement.id);
    },
    [currentStroke, elements, pushHistory]
  );

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result as string;
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const maxSize = 150;
          const width = aspectRatio > 1 ? maxSize : maxSize * aspectRatio;
          const height = aspectRatio > 1 ? maxSize / aspectRatio : maxSize;
          addElementWithHistory({
            id: generateId(),
            type: "image",
            x: CANVAS_SIZE / 2,
            y: CANVAS_SIZE / 2,
            width,
            height,
            fill: "transparent",
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            imageSrc: reader.result as string,
            imageElement: img,
          });
        };
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [addElementWithHistory]
  );

  const loadTemplate = useCallback(
    (template: DefaultTemplate) => {
      const newElements: EditorElement[] = template.elements.map(
        (el) =>
          ({
            id: generateId(),
            type: el.type || "rect",
            x: el.x || CANVAS_SIZE / 2,
            y: el.y || CANVAS_SIZE / 2,
            width: el.width,
            height: el.height,
            radius: el.radius,
            fill: el.fill || "#ffffff",
            stroke: el.stroke,
            strokeWidth: el.strokeWidth || 2,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            text: el.text,
            fontSize: el.fontSize,
            fontFamily: el.fontFamily || "Arial, sans-serif",
            fontStyle: el.fontStyle,
          } as EditorElement)
      );
      setElements(newElements);
      setSelectedId(null);
      pushHistory(newElements, null);
    },
    [pushHistory]
  );

  const updateElementWithHistory = useCallback(
    (id: string, updates: Partial<EditorElement>) => {
      const newElements = elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      );
      setElements(newElements);
      pushHistory(newElements, selectedId);
    },
    [elements, pushHistory, selectedId]
  );

  const duplicateElement = useCallback(
    (id: string) => {
      const element = elements.find((el) => el.id === id);
      if (!element) return;
      addElementWithHistory({
        ...element,
        id: generateId(),
        x: element.x + 20,
        y: element.y + 20,
      });
    },
    [elements, addElementWithHistory]
  );

  const moveLayer = useCallback(
    (id: string, direction: "up" | "down") => {
      const index = elements.findIndex((el) => el.id === id);
      if (index === -1) return;
      const newIndex = direction === "up" ? index + 1 : index - 1;
      if (newIndex < 0 || newIndex >= elements.length) return;
      const newElements = [...elements];
      [newElements[index], newElements[newIndex]] = [
        newElements[newIndex],
        newElements[index],
      ];
      setElements(newElements);
      pushHistory(newElements, selectedId);
    },
    [elements, pushHistory, selectedId]
  );

  const clearCanvas = () => {
    setElements([]);
    setSelectedId(null);
    pushHistory([], null);
  };

  const saveWithReferenceCode = async () => {
    if (!stageRef.current) return;
    setIsSaving(true);
    setSelectedId(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dataUrl = stageRef.current.toDataURL({
        pixelRatio: EXPORT_SIZE / CANVAS_SIZE,
        mimeType: "image/png",
      });
      const code = generateReferenceCode();
      // API call - for demo, simulate success
      await fetch("/api/stickers/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceCode: code,
          imageData: dataUrl,
          elements: elements.map((el) => ({ ...el, imageElement: undefined })),
        }),
      }).catch(() => {});
      setReferenceCode(code);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadPNG = useCallback(() => {
    if (!stageRef.current) return;
    setSelectedId(null);
    setTimeout(() => {
      const dataUrl = stageRef.current!.toDataURL({
        pixelRatio: EXPORT_SIZE / CANVAS_SIZE,
        mimeType: "image/png",
      });
      const link = document.createElement("a");
      link.download = `scanfleet-sticker-${referenceCode || Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }, 100);
  }, [referenceCode]);

  const getStickerDataForPurchase = useCallback(async () => {
    if (!stageRef.current) return null;
    setSelectedId(null);
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      imageData: stageRef.current.toDataURL({
        pixelRatio: EXPORT_SIZE / CANVAS_SIZE,
        mimeType: "image/png",
      }),
      referenceCode,
      elements: elements.map((el) => ({ ...el, imageElement: undefined })),
    };
  }, [elements, referenceCode]);

  const handleStageClick = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };
  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>, id: string) => {
    const node = e.target;
    updateElementWithHistory(id, {
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
    });
  };
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, id: string) => {
    updateElementWithHistory(id, { x: e.target.x(), y: e.target.y() });
  };

  const renderElement = (element: EditorElement) => {
    const commonProps = {
      key: element.id,
      id: element.id,
      x: element.x,
      y: element.y,
      rotation: element.rotation,
      scaleX: element.scaleX,
      scaleY: element.scaleY,
      draggable: true,
      onClick: () => setSelectedId(element.id),
      onTap: () => setSelectedId(element.id),
      onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) =>
        handleDragEnd(e, element.id),
      onTransformEnd: (e: Konva.KonvaEventObject<Event>) =>
        handleTransformEnd(e, element.id),
    };
    switch (element.type) {
      case "rect":
        return (
          <Rect
            {...commonProps}
            width={element.width}
            height={element.height}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            offsetX={(element.width || 0) / 2}
            offsetY={(element.height || 0) / 2}
            dash={
              element.borderStyle === "dashed"
                ? [10, 5]
                : element.borderStyle === "dotted"
                ? [2, 3]
                : undefined
            }
            cornerRadius={element.borderStyle === "solid" ? 8 : 0}
          />
        );
      case "circle":
        return (
          <Circle
            {...commonProps}
            radius={element.radius}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
          />
        );
      case "star":
        return (
          <Star
            {...commonProps}
            numPoints={element.numPoints || 5}
            innerRadius={element.innerRadius || 20}
            outerRadius={element.outerRadius || 40}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
          />
        );
      case "triangle":
        return (
          <RegularPolygon
            {...commonProps}
            sides={3}
            radius={element.radius || 40}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
          />
        );
      case "arrow":
        return (
          <Arrow
            {...commonProps}
            points={element.points || [0, 0, 60, 0]}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth || 3}
            pointerLength={10}
            pointerWidth={10}
          />
        );
      case "text":
        return (
          <Text
            {...commonProps}
            text={element.text}
            fontSize={element.fontSize}
            fontFamily={element.fontFamily}
            fontStyle={element.fontStyle}
            fill={element.fill}
            align='center'
            verticalAlign='middle'
          />
        );
      case "image":
        return element.imageElement ? (
          <KonvaImage
            {...commonProps}
            image={element.imageElement}
            width={element.width}
            height={element.height}
            offsetX={(element.width || 0) / 2}
            offsetY={(element.height || 0) / 2}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-black relative'>
      <div
        className='absolute inset-0 z-0'
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255, 20, 147, 0.15), transparent 50%), radial-gradient(ellipse 160% 130% at 10% 10%, rgba(0, 255, 255, 0.12), transparent 60%), radial-gradient(ellipse 160% 130% at 90% 90%, rgba(138, 43, 226, 0.18), transparent 65%), #000000`,
        }}
      />
      <div className='relative z-10 max-w-7xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-3xl font-bold text-white'>
              Smart Sticker Editor
            </h1>
            <p className='text-white/60'>
              Design your custom emergency sticker (8cm × 8cm)
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={undo}
              disabled={!canUndo}
              className='border-white/20 text-white hover:bg-white/10 bg-transparent disabled:opacity-30'
            >
              <Undo2 size={18} />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={redo}
              disabled={!canRedo}
              className='border-white/20 text-white hover:bg-white/10 bg-transparent disabled:opacity-30'
            >
              <Redo2 size={18} />
            </Button>
            <span className='text-xs text-white/40 ml-2'>Ctrl+Z / Ctrl+Y</span>
          </div>
        </div>

        <div className='grid lg:grid-cols-[1fr_420px_280px] gap-6'>
          {/* LEFT PANEL */}
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-4 max-h-[80vh] overflow-y-auto'>
            <div className='relative'>
              <label className='block text-sm font-medium text-white/70 mb-2'>
                Language
              </label>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className='w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10'
              >
                <span>{selectedLanguage.nativeName}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    showLanguageMenu ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showLanguageMenu && (
                <div className='absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden z-20 max-h-60 overflow-y-auto'>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-white/10 flex items-center justify-between ${
                        selectedLanguage.code === lang.code
                          ? "bg-white/10 text-cyan-400"
                          : "text-white"
                      }`}
                    >
                      <span>
                        {lang.nativeName}{" "}
                        <span className='text-white/50'>({lang.name})</span>
                      </span>
                      {selectedLanguage.code === lang.code && (
                        <Check size={16} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className='flex flex-wrap gap-1 bg-white/5 p-1 rounded-xl'>
              {(
                [
                  "templates",
                  "shapes",
                  "icons",
                  "text",
                  "borders",
                  "images",
                ] as const
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className='space-y-3'>
              {activeTab === "templates" && (
                <div className='grid grid-cols-2 gap-3'>
                  {DEFAULT_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => loadTemplate(template)}
                      className='p-3 bg-white/5 hover:bg-white/10 rounded-xl text-left'
                    >
                      <div className='aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-2 flex items-center justify-center text-2xl'>
                        {template.emoji}
                      </div>
                      <p className='text-sm text-white font-medium truncate'>
                        {template.name}
                      </p>
                    </button>
                  ))}
                </div>
              )}
              {activeTab === "shapes" && (
                <div className='grid grid-cols-3 gap-2'>
                  {[
                    {
                      type: "rect",
                      icon: Square,
                      label: "Rectangle",
                      color: "text-cyan-400",
                    },
                    {
                      type: "circle",
                      icon: CircleIcon,
                      label: "Circle",
                      color: "text-purple-400",
                    },
                    {
                      type: "star",
                      icon: StarIcon,
                      label: "Star",
                      color: "text-yellow-400",
                    },
                    {
                      type: "triangle",
                      icon: Triangle,
                      label: "Triangle",
                      color: "text-green-400",
                    },
                    {
                      type: "arrow",
                      icon: ArrowRight,
                      label: "Arrow",
                      color: "text-blue-400",
                    },
                  ].map((shape) => (
                    <button
                      key={shape.type}
                      onClick={() =>
                        addShape(shape.type as EditorElement["type"])
                      }
                      className='flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl'
                    >
                      <shape.icon size={24} className={shape.color} />
                      <span className='text-xs text-white/70'>
                        {shape.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {activeTab === "icons" && (
                <div className='grid grid-cols-3 gap-2'>
                  {[
                    {
                      id: "car",
                      icon: Car,
                      label: "Car",
                      color: "text-blue-400",
                    },
                    {
                      id: "bike",
                      icon: Bike,
                      label: "Bike",
                      color: "text-purple-400",
                    },
                    {
                      id: "phone",
                      icon: Phone,
                      label: "Phone",
                      color: "text-green-400",
                    },
                    {
                      id: "sos",
                      icon: AlertTriangle,
                      label: "SOS",
                      color: "text-red-400",
                    },
                    {
                      id: "medical",
                      icon: Plus,
                      label: "Medical",
                      color: "text-red-400",
                    },
                    {
                      id: "shield",
                      icon: Shield,
                      label: "Shield",
                      color: "text-cyan-400",
                    },
                    {
                      id: "heart",
                      icon: Heart,
                      label: "Heart",
                      color: "text-pink-400",
                    },
                    {
                      id: "warning",
                      icon: AlertTriangle,
                      label: "Warning",
                      color: "text-yellow-400",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addIcon(item.id)}
                      className='flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl'
                    >
                      <item.icon size={24} className={item.color} />
                      <span className='text-xs text-white/70'>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {activeTab === "text" && (
                <div className='space-y-3'>
                  <input
                    type='text'
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder='Enter text...'
                    className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400'
                  />
                  <div className='flex items-center gap-3'>
                    <span className='text-sm text-white/70 w-12'>Size:</span>
                    <input
                      type='range'
                      min='12'
                      max='72'
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className='flex-1'
                    />
                    <span className='text-sm text-white w-8'>{fontSize}</span>
                  </div>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white'
                  >
                    {FONT_FAMILIES.map((font) => (
                      <option
                        key={font.value}
                        value={font.value}
                        className='bg-slate-900'
                      >
                        {font.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={() => addText(textInput)}
                    disabled={!textInput.trim()}
                    className='w-full bg-gradient-to-r from-cyan-500 to-purple-600 disabled:opacity-50'
                  >
                    <Type size={18} className='mr-2' />
                    Add Text
                  </Button>
                  <div>
                    <label className='block text-sm font-medium text-white/70 mb-2'>
                      Quick Add ({selectedLanguage.nativeName})
                    </label>
                    <div className='grid grid-cols-2 gap-2'>
                      {selectedLanguage.sampleTexts.map((text, idx) => (
                        <button
                          key={idx}
                          onClick={() => addText(text)}
                          className='px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 truncate'
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "borders" && (
                <div className='grid grid-cols-2 gap-2'>
                  {[
                    { id: "solid", label: "Solid" },
                    { id: "dashed", label: "Dashed" },
                    { id: "rounded", label: "Rounded" },
                    { id: "double", label: "Double" },
                  ].map((border) => (
                    <button
                      key={border.id}
                      onClick={() =>
                        addBorder(
                          border.id as "solid" | "dashed" | "rounded" | "double"
                        )
                      }
                      className='flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl'
                    >
                      <Frame size={20} className='text-cyan-400' />
                      <span className='text-sm text-white/70'>
                        {border.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {activeTab === "images" && (
                <div className='space-y-3'>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className='w-full bg-white/10 hover:bg-white/20 border border-white/20'
                  >
                    <Upload size={18} className='mr-2' />
                    Upload Image
                  </Button>
                  <p className='text-xs text-white/50 text-center'>
                    PNG, JPG, GIF supported
                  </p>
                </div>
              )}
            </div>

            <div className='space-y-3 pt-4 border-t border-white/10'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-white/70'>
                  Fill Color
                </span>
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className='w-8 h-8 rounded-lg border-2 border-white/20'
                  style={{ backgroundColor: currentColor }}
                />
              </div>
              {showColorPicker && (
                <div className='grid grid-cols-5 gap-2'>
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setCurrentColor(color);
                        if (selectedId)
                          updateElementWithHistory(selectedId, { fill: color });
                      }}
                      className={`w-8 h-8 rounded-lg border-2 hover:scale-110 ${
                        currentColor === color
                          ? "border-white"
                          : "border-white/20"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-white/70'>
                  Stroke
                </span>
                <div className='flex gap-2'>
                  {["#000000", "#ffffff", "#ef4444", "#22c55e", "#3b82f6"].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setCurrentStroke(color);
                          if (selectedId)
                            updateElementWithHistory(selectedId, {
                              stroke: color,
                            });
                        }}
                        className={`w-6 h-6 rounded border-2 ${
                          currentStroke === color
                            ? "border-cyan-400"
                            : "border-white/20"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER - CANVAS */}
          <div className='flex flex-col items-center'>
            <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4'>
              <div
                className='relative bg-white rounded-xl overflow-hidden'
                style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
              >
                <Stage
                  ref={stageRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  onClick={handleStageClick}
                  onTap={handleStageClick}
                >
                  <Layer ref={layerRef}>
                    <Rect
                      x={0}
                      y={0}
                      width={CANVAS_SIZE}
                      height={CANVAS_SIZE}
                      fill='#ffffff'
                    />
                    {elements.map(renderElement)}
                    <Transformer
                      ref={transformerRef}
                      boundBoxFunc={(oldBox, newBox) =>
                        newBox.width < 10 || newBox.height < 10
                          ? oldBox
                          : newBox
                      }
                      rotateEnabled
                      enabledAnchors={[
                        "top-left",
                        "top-right",
                        "bottom-left",
                        "bottom-right",
                        "middle-left",
                        "middle-right",
                        "top-center",
                        "bottom-center",
                      ]}
                    />
                  </Layer>
                </Stage>
                {selectedId && (
                  <div className='absolute top-2 left-2 px-2 py-1 bg-black/50 rounded text-xs text-white'>
                    {selectedElement?.type}
                  </div>
                )}
              </div>
              <div className='flex justify-center gap-2 mt-4'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={clearCanvas}
                  className='border-white/20 text-white hover:bg-white/10 bg-transparent'
                >
                  <Trash2 size={16} className='mr-1' />
                  Clear
                </Button>
                <Button
                  size='sm'
                  onClick={downloadPNG}
                  className='bg-gradient-to-r from-cyan-500 to-purple-600'
                >
                  <Download size={16} className='mr-1' />
                  Download
                </Button>
              </div>
            </div>
            <div className='mt-4 w-full max-w-md'>
              <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4'>
                <div className='flex items-center gap-2 mb-3'>
                  <FileCode size={18} className='text-cyan-400' />
                  <span className='text-sm font-medium text-white'>
                    Reference Code
                  </span>
                </div>
                {referenceCode ? (
                  <div className='flex items-center justify-between bg-white/10 rounded-lg p-3'>
                    <span className='font-mono text-lg text-cyan-400'>
                      {referenceCode}
                    </span>
                    <span className='text-xs text-green-400'>Saved</span>
                  </div>
                ) : (
                  <Button
                    onClick={saveWithReferenceCode}
                    disabled={isSaving || elements.length === 0}
                    className='w-full bg-white/10 hover:bg-white/20 border border-white/20'
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={16} className='mr-2 animate-spin' />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className='mr-2' />
                        Save & Get Code
                      </>
                    )}
                  </Button>
                )}
                <p className='text-xs text-white/50 mt-2 text-center'>
                  {referenceCode
                    ? "Code valid for 4 days. Use at checkout."
                    : "Save to get a reference code for checkout"}
                </p>
              </div>
            </div>
            <p className='mt-2 text-sm text-white/50'>
              8cm × 8cm • 800×800px export
            </p>
          </div>

          {/* RIGHT PANEL - PROPERTIES */}
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-4 max-h-[80vh] overflow-y-auto'>
            <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
              <Layers size={20} className='text-cyan-400' />
              Properties
            </h3>
            {selectedElement ? (
              <div className='space-y-4'>
                <div className='p-3 bg-white/5 rounded-xl'>
                  <p className='text-sm text-white/70'>
                    Type:{" "}
                    <span className='text-white capitalize'>
                      {selectedElement.type}
                    </span>
                  </p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white/70'>
                    Position
                  </label>
                  <div className='grid grid-cols-2 gap-2'>
                    <div>
                      <span className='text-xs text-white/50'>X</span>
                      <input
                        type='number'
                        value={Math.round(selectedElement.x)}
                        onChange={(e) =>
                          updateElementWithHistory(selectedId!, {
                            x: Number(e.target.value),
                          })
                        }
                        className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm'
                      />
                    </div>
                    <div>
                      <span className='text-xs text-white/50'>Y</span>
                      <input
                        type='number'
                        value={Math.round(selectedElement.y)}
                        onChange={(e) =>
                          updateElementWithHistory(selectedId!, {
                            y: Number(e.target.value),
                          })
                        }
                        className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm'
                      />
                    </div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white/70'>
                    Rotation: {Math.round(selectedElement.rotation)}°
                  </label>
                  <input
                    type='range'
                    min='0'
                    max='360'
                    value={selectedElement.rotation}
                    onChange={(e) =>
                      updateElementWithHistory(selectedId!, {
                        rotation: Number(e.target.value),
                      })
                    }
                    className='w-full'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-white/70'>
                    Scale
                  </label>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() =>
                        updateElementWithHistory(selectedId!, {
                          scaleX: selectedElement.scaleX * 0.9,
                          scaleY: selectedElement.scaleY * 0.9,
                        })
                      }
                      className='p-2 bg-white/5 hover:bg-white/10 rounded-lg'
                    >
                      <Minus size={16} className='text-white' />
                    </button>
                    <span className='flex-1 text-center text-sm text-white'>
                      {Math.round(selectedElement.scaleX * 100)}%
                    </span>
                    <button
                      onClick={() =>
                        updateElementWithHistory(selectedId!, {
                          scaleX: selectedElement.scaleX * 1.1,
                          scaleY: selectedElement.scaleY * 1.1,
                        })
                      }
                      className='p-2 bg-white/5 hover:bg-white/10 rounded-lg'
                    >
                      <Plus size={16} className='text-white' />
                    </button>
                  </div>
                </div>
                {selectedElement.type === "text" && (
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-white/70'>
                      Text
                    </label>
                    <input
                      type='text'
                      value={selectedElement.text || ""}
                      onChange={(e) =>
                        updateElementWithHistory(selectedId!, {
                          text: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white'
                    />
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-white/50'>Size:</span>
                      <input
                        type='number'
                        value={selectedElement.fontSize || 24}
                        onChange={(e) =>
                          updateElementWithHistory(selectedId!, {
                            fontSize: Number(e.target.value),
                          })
                        }
                        className='w-20 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm'
                      />
                    </div>
                  </div>
                )}
                <div className='flex gap-2 pt-4 border-t border-white/10'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => duplicateElement(selectedId!)}
                    className='flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent'
                  >
                    <Copy size={14} className='mr-1' />
                    Copy
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => deleteElement(selectedId!)}
                    className='flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent'
                  >
                    <Trash2 size={14} className='mr-1' />
                    Delete
                  </Button>
                </div>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => moveLayer(selectedId!, "down")}
                    className='flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent'
                  >
                    ↓ Back
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => moveLayer(selectedId!, "up")}
                    className='flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent'
                  >
                    ↑ Front
                  </Button>
                </div>
              </div>
            ) : (
              <div className='text-center py-8'>
                <Move size={48} className='mx-auto text-white/20 mb-4' />
                <p className='text-white/50 text-sm'>
                  Select an element to edit
                </p>
              </div>
            )}
            <div className='pt-4 border-t border-white/10'>
              <h4 className='text-sm font-medium text-white/70 mb-2'>
                Layers ({elements.length})
              </h4>
              <div className='space-y-1 max-h-40 overflow-y-auto'>
                {[...elements].reverse().map((el) => (
                  <button
                    key={el.id}
                    onClick={() => setSelectedId(el.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      selectedId === el.id
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className='w-4 h-4 rounded'
                      style={{
                        backgroundColor:
                          el.fill === "transparent" ? "#666" : el.fill,
                      }}
                    />
                    <span className='truncate'>
                      {el.type}
                      {el.text ? `: ${el.text.slice(0, 8)}` : ""}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <Button
            onClick={async () => {
              const data = await getStickerDataForPurchase();
              console.log("Sticker data:", data);
            }}
            disabled={elements.length === 0}
            className='bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 px-8 py-4 text-lg font-semibold rounded-xl disabled:opacity-50'
          >
            Continue to Purchase →
          </Button>
          <p className='mt-2 text-white/50 text-sm'>
            {referenceCode
              ? `Reference: ${referenceCode}`
              : "Design will be attached to your Smart QR Sticker"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StickerEditor;
