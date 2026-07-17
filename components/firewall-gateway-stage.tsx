import { forwardRef, type CSSProperties } from "react";

type FirewallGatewayStageProps = {
  variant: "cinematic" | "service";
};

const wanPorts = ["WAN 1", "WAN 2"];
const lanPorts = Array.from({ length: 8 }, (_, index) => `LAN ${String(index + 1).padStart(2, "0")}`);
const systemPorts = ["DMZ", "MGMT", "HA"];

function GatewayPort({ label, index, kind = "rj45" }: { label: string; index: number; kind?: "rj45" | "sfp" }) {
  return (
    <div
      className={`gateway-port gateway-port-${kind}`}
      style={{ "--gateway-port-delay": `${index * -.23}s` } as CSSProperties}
    >
      <span /><i /><b />
      <small>{label}</small>
    </div>
  );
}

const FirewallGatewayStage = forwardRef<HTMLDivElement, FirewallGatewayStageProps>(function FirewallGatewayStage({ variant }, ref) {
  const service = variant === "service";

  return (
    <div
      ref={ref}
      className={`firewall-gateway-stage firewall-gateway-${variant}${service ? " service-firewall-gateway" : " firewall-product-stage"}`}
      role={service ? "img" : undefined}
      aria-label={service ? "FortiGate esintili güvenlik ağ geçidi ve aktif ağ trafiği görselleştirmesi" : undefined}
      aria-hidden={service ? undefined : true}
    >
      <div className="gateway-halo" />
      <svg className="gateway-flow-map" viewBox="0 0 1200 520" preserveAspectRatio="none" role="presentation">
        <g className="gateway-flow-base">
          <path d="M0 272 H142 L226 224 H352" />
          <path d="M848 224 H970 L1058 272 H1200" />
          <path d="M620 0 V82 L592 126 V194" />
        </g>
        <path className="gateway-flow-ingress" d="M0 272 H142 L226 224 H352" pathLength="1" />
        <path className="gateway-flow-egress" d="M848 224 H970 L1058 272 H1200" pathLength="1" />
        <path className="gateway-flow-threat" d="M620 0 V82 L592 126 V194" pathLength="1" />
        <circle cx="226" cy="224" r="5" />
        <circle cx="970" cy="224" r="5" />
      </svg>

      <div className="gateway-blocked-packet"><i /></div>

      <div className="gateway-chassis">
        <div className="gateway-chassis-top">
          <span>SECURITY GATEWAY</span>
          <b><i /> SYSTEM ONLINE</b>
        </div>

        <div className="gateway-face">
          <div className="gateway-control-module">
            <div className="gateway-display"><span>DH</span><small>POLICY</small></div>
            <i /><i /><i />
          </div>

          <div className="gateway-port-deck">
            <div className="gateway-port-group gateway-port-group-wan">
              <p>WAN / SFP</p>
              <div>{wanPorts.map((label, index) => <GatewayPort label={label} index={index} kind="sfp" key={label} />)}</div>
            </div>
            <div className="gateway-port-group gateway-port-group-lan">
              <p>SECURE LAN</p>
              <div>{lanPorts.map((label, index) => <GatewayPort label={label} index={index + 2} key={label} />)}</div>
            </div>
            <div className="gateway-port-group gateway-port-group-system">
              <p>SYSTEM</p>
              <div>{systemPorts.map((label, index) => <GatewayPort label={label} index={index + 10} key={label} />)}</div>
            </div>
          </div>

          <div className="gateway-policy-core">
            <svg viewBox="0 0 48 54" role="presentation"><path d="M24 2 43 10v14c0 12-7.5 22-19 28C12.5 46 5 36 5 24V10Z" /><path d="m15 26 6 6 13-14" /></svg>
            <span>POLICY<br />CORE</span>
            <i />
          </div>

          <div className="gateway-vents" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
          <div className="gateway-scan-beam" />
        </div>

        <div className="gateway-status-strip">
          <span>TRAFFIC INSPECTION / ACTIVE</span>
          <span>POLICY MATCH / ENFORCED</span>
          <span>SECURITY GATEWAY / READY</span>
        </div>
      </div>

      <div className="gateway-telemetry" aria-hidden="true">
        <span><i /> INGRESS</span>
        <span><i /> INSPECT</span>
        <span><i /> FORWARD</span>
      </div>
    </div>
  );
});

FirewallGatewayStage.displayName = "FirewallGatewayStage";

export default FirewallGatewayStage;
